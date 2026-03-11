import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is required");
}

if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
  throw new Error("Stripe webhook secret key is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});


// ? this is server to server api 
// ** stripe server will hit this api for informing me that payemnt received or not
export async function POST(request: Request) {
  // Get the raw body as text. Stripe signature verification requires raw body.
  const rawBody = await request.text();
  console.log("whole request: ", request);
  console.log("rawbody: ", rawBody);

  // Read the signature header Stripe sends
  const signature = request.headers.get("stripe-signature") ?? "";
  console.log("signature: ", signature);

  let event: Stripe.Event;

  try {
    // Use stripe.webhooks.constructEvent to verify the payload
    // This throws if signature is invalid or payload tampered with.
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      console.error("Invalid Stripe Signature:", error.message);
      return new Response(`Invalid signature: ${error.message}`, {
        status: 400,
      });
    }

    if (error instanceof Error) {
      console.error("Webhook Error:", error.message);
      return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // fallback
    console.error("Unknown error:", error);
    return new Response("Unknown error", { status: 400 });
  }

  // At this point the event is verified. Inspect event.type:

  try {
    await dbConnect();
    switch (event.type) {
      case "payment_intent.succeeded": {
        // if succeed extract the data from event
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("payment intent succeeded", paymentIntent.id);

        // check db if order already exist for same paymentIntentId
        const existingOrder = await Order.findById(paymentIntent.id);
        if (existingOrder) {
          console.log("Order already exist for ", paymentIntent.id);
          break;
        }

        console.log("whole event: ", event);
        // if order dont exist then add order to db

        break;
      }

      case "payment_intent.payment_failed": {
        break;
      }
    }
  } catch (error) {}
}
