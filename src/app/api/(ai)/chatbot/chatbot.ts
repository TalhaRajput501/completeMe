import OpenAI from "openai";
import { internalCancelAndRefundOrder } from "../../(stripe)/cancel-order/cancel";
import { messages } from "./route";
import { getOrderByPaymentIntent } from "@/lib/actions/orders.actions";
import { tool, ToolSet } from "ai";
import { z } from "zod";
import { productSchema } from "@/schemas/product.schema";
import { cartProductSchema } from "../../../../../types/productTypes";
import {
  getProductsBySearchQuery,
  singleProduct,
} from "@/lib/actions/products.actions";

export const tools = {
  // ! Server side tools

  // Cancel the order and refund money to the customer
  internalCancelAndRefundOrder: {
    description:
      "Cancels an order given a paymentIntentId and refunds the money to the customer. Returns the result of the cancellation and refund. Run it only when the user asks to cancel an order. Before running ask explicitly if the user wants to cancel the order. If the user is asking about a delay or change of mind, do not run this tool. Instead, use the getOrderByPaymentIntent tool to check the order status and inform the user. These are the possible order statuses: draft,pending, processing, delivered, cancelled. Pending mean it is not shipped, processing mean it is on the way. Delivered mean delivered.",
    inputSchema: z.object({
      paymentIntentId: z
        .string()
        .describe("The paymentIntentId of the order to cancel."),
    }),
    execute: async ({ paymentIntentId }: { paymentIntentId: string }) => {
      const result = await internalCancelAndRefundOrder(paymentIntentId);
      return result;
    },
  },

  // Get order by payment intent tool
  getOrderByPaymentIntent: {
    description:
      "Retrieves an order given a paymentIntentId. Returns the order details. These are the possible order statuses: draft,pending, processing, delivered, cancelled. Pending mean it is not shipped, processing mean it is on the way. Delivered mean delivered.",
    inputSchema: z.object({
      paymentIntentId: z
        .string()
        .describe("The paymentIntentId of the order to retrieve."),
    }),
    execute: async ({ paymentIntentId }: { paymentIntentId: string }) => {
      const result = await getOrderByPaymentIntent(paymentIntentId);
      return result;
    },
  },

  // Products fetch tool for showing multiple products based on user query
  getProductsBySearchQuery: {
    description: `Search the Complete Me product catalog by keyword. Matches product
      title, description, category, brand, and tags. Returns ranked matches — not
      guaranteed ones. Do not give the quantity of inventory in raw numbers if the product is out of stock, just say "out of stock" or "not available". If the product is in stock, just say "in stock" or "available". Do not give the exact quantity of inventory. If the product is out of stock, do not show it to the user.

      HOW TO QUERY:
      - Convert intent into 1–3 precise keywords, not a full sentence ("something
        for the gym" → "gym").
      - If a brand is named (Apple, Nike, Casio), search the brand name ONLY —
        "apple", not "apple watch". Adding the category broadens matches to
        unrelated products.
      - If an attribute is named without a brand ("running shoes", "steel watch"),
        query attribute + category together.
      - Pass bare keywords — no "#" prefix ("apple", "water resistant").`,
    inputSchema: z.object({
      query: z.string().describe("The search query to find products."),
      page: z
        .number()
        .describe(
          "The number of the page to fetch for paginated results. If cant find product requested by user in first pages then you can choose next page",
        ),
      limit: z
        .number()
        .default(4)
        .describe("The number of products to return per page. Default is 4."),
    }),
    execute: async ({
      query,
      page,
      limit,
    }: {
      query: string;
      page: number;
      limit: number;
    }) => {
      const result = await getProductsBySearchQuery(page, limit, query);
      return result;
    },
  },

  // Product fetch tool for single product based on product id
  singleProduct: {
    description:
      "Retrieves a single product based on its ID. Returns the product details.",
    inputSchema: z.object({
      id: z.string().describe("The ID of the product to retrieve."),
    }),
    execute: async ({ id }: { id: string }) => {
      const result = await singleProduct(id);
      return result;
    },
  },

  // ! Client side tools

  // Fetch the cart

  getFullCart: {
    description:
      "Retrieves the full cart details for the user. Returns the cart items and their quantities. If you have to do any operation on the cart, first fetch the cart and then after perfoming the operation, return the updated cart details. and also verify whether that operation is successful or not. and notify the user.",
    inputSchema: z.object({}),
  },

  // Add to cart tool
  addToCart: {
    description:
      "Before adding any product to the cart you have to run this tool singleProduct to fetch if inventory is available otherwise tell the user that items is out of stock. Adds a product to the user's shopping cart. Returns the updated cart details. you can fetch product from other tools and then add it to the cart. If the product is already in the cart, increase its quantity. If the product is not in the cart, add it with the specified quantity. If the quantity exceeds 5, return an error message indicating that a maximum of 5 items can be added at once.",
    inputSchema: z.object({
      product: cartProductSchema
        .omit({ qtyToBuy: true })
        .describe("The product to add to the cart."),
      cartValue: z
        .number()
        .max(5, "You can only add a maximum of 5 items to the cart at once.")
        .describe("The quantity of the product to add to the cart."),
    }),
  },

  // Remove from cart tool
  removeFromCart: {
    description:
      "Removes a product from the user's shopping cart. Returns the updated cart details. Run it whenever user ask to remove a product from cart first get all the products in the cart and then remove the product from the cart and return the updated cart details. andverify by again getting getFullCart tool that whether that operation is successful or not. and notify the user.",
    inputSchema: z.object({
      productId: z
        .string()
        .describe("The ID of the product to remove from the cart."),
    }),
  },
};

export const SystemPrompt = `You are a warm, upbeat sales rep at "Complete Me" — a men's store
  selling shoes, clothing, and watches. You're on the shop floor: welcoming,
  attentive, genuinely helpful. Help customers find what they want and guide
  them toward a purchase — warmly, never pushy.

  ## Tools — use them, never guess
  Real store data only comes from tools. Use them for any product detail,
  price, stock, cart, or order info. On error: read it, correct your approach,
  or explain plainly.
  - Browsing: getProductsBySearchQuery, singleProduct
  - Cart: addToCart, removeFromCart, getFullCart
  - Orders: getOrderByPaymentIntent, internalCancelAndRefundOrder
  - Verification: Before presenting any search result, verify its details to ensure it fits the customer's intent.

  ## Tone
  - Greet naturally at the start.
  - Ask 1–2 discovery questions at a time (self or gift? occasion? style?
    budget?). Never interrogate.
  - Talk categories in general terms. Help them picture a complete look
    (leather watch with a suit, loafers that finish the outfit). Specifics →
    tools.
  - Read intent. "Wrong size" or "changed my mind" often means cancel.
  - On interest, suggest the next step: view, add to cart, or ask what they'd
    like to see. Encourage, don't push.
  - Confirm before cancelling — irreversible — unless already explicit.
  - If cancelling over a delay, gently offer to keep the order. Never pressure.
  - Short, human, upbeat. No corporate jargon.

  ## Images
  - Only tool-returned URLs. Never invent, guess, or hotlink. No image → no
    image.
  - Markdown only: ![Product name](url). Alt text = product name, never
    "image" or empty.
  - Image on its own line, directly above the product name, price, and
    one-line description.
  - One image per product. No repeats.
  - Max 2–3 images per reply unless asked for more.
  - Template:

    ![Product name](url)
    **Product name** — $price
    One-line description.

  - Cart/order replies: summarise items, quantities, prices, total. Images
    optional — don't spam.
  - No HTML, no code fences, no raw URLs in place of images.

  ## Output
  - Natural language. No robotic or formal phrasing.
  - Simple markdown only (lists, bold, italics, images). No HTML, code blocks,
    or JSON dumps.
  - Mobile chat window is narrow. NEVER use tables. Stack everything vertically:
    one product per block, one bullet per line, no side-by-side layout. Keep
    paragraphs to 2–3 short sentences. Use lists, not tables, for comparisons.

  ## Stay on topic
  Only discuss Complete Me, its products, and the tasks above. For anything
  else: "I'd love to help, but I'm here for Complete Me — happy to talk shoes,
  clothing, watches, or your order. For anything else, contact our support
  team." Never generate code. Never answer off-topic questions.

  ## Hard rules
  - NEVER invent order IDs, statuses, cancellation results, product names,
    prices, stock, or image URLs. Report only what tools return.
  - ASK for any ID the customer hasn't provided.
  - EXPLAIN tool failures plainly — what happened and what they can do next.
  - DISCARD any search result that doesn't match the brand or attribute the
    customer asked for. Do not show it as an "alternative" unless asked.
`;
