import { productsForCharge } from "@/lib/actions/products.actions";
import { dbConnect } from "@/lib/dbConnect";
import { Order, OrderProduct } from "@/models/orders.model";
// import { ObjectId } from "mongoose";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("Stripe secret key is required");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    // get ids and quantity from frontend
    console.log('entered in the api now see whats happen')
    const { products }: { products: { _id: string; qtyToBuy: number }[] } =
      await request.json();

    if (!products) {
      return NextResponse.json({
        message: "Please select some products to checkout",
      });
    }

    // create array of only ids for fetching from backend
    const objectIds = products.map((i) => i._id);
    // fetch products from server function
    const dbProducts: { _id: Types.ObjectId; price: number }[] =
      await productsForCharge(objectIds);

    // create total bill from fetched products
    const productMap = new Map<string, number>(
      products.map((i) => [i._id, i.qtyToBuy])
    );

    const totalBill = dbProducts.reduce((total, current) => {
      const quantity = productMap.get(current._id.toString());
      return total + current.price * quantity!;
    }, 0);

    // final array of products for draft order
    const productsArray: OrderProduct[] = dbProducts.map((item) => {
      const qty = productMap.get(item._id.toString());
      return {
        productId: item._id,
        orderedQuantity: qty!,
        price: item.price,
      };
    });

    // create draft order
    await dbConnect()
    // const orderFromDB = new Order({
    //   products: productsArray,
    //   totalAmount: totalBill * 100, // us dollars
    //   status: "draft",
    // });

    // creat payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100, // us dollars
      currency: "usd",
      // automatic_payment_methods: { enabled: true },
      payment_method_types: ["card"],
      metadata: {
        orderId: 'orderFromDB._id.toString()',
      },
    });

    // now intent id is available take it and save the draft order
    // orderFromDB.paymentIntentId = paymentIntent.id;
    // await orderFromDB.save();

    // console.log("product from frontend", products);
    // console.log("get only ids", objectIds);
    // console.log("products from db", dbProducts);
    // console.log("product map", productMap);
    // console.log("total bill", totalBill);
    // console.log("order products array", productsArray);
    // console.log("order from db", orderFromDB);

    console.log({
      clientSecret: paymentIntent.client_secret,
      // orderId: orderFromDB._id,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      // orderId: orderFromDB._id.toString(),
    });
  } catch (error) {
    console.log("Internal Error from /peyment-intent route: ", error);
    return NextResponse.json({
      error,
    });
  }
}
