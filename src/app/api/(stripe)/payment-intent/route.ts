import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("Stripe secret key is required");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      // automatic_payment_methods: { enabled: true },
      payment_method_types: ['card'],
      metadata: {
        
      }
    });

    return NextResponse.json({clientSecret: paymentIntent.client_secret})
  } catch (error) {
    console.error('Internal Error: ', error)
    return NextResponse.json({
      error
    })
  }
}
