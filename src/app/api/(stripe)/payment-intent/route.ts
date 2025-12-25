import { productsForCharge } from "@/lib/actions/products.actions";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("Stripe secret key is required");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { products }: { products: { _id: string; qtyToBuy: number }[] } =
      await request.json(); // this amount will be caluculated from db products
    if (!products) {
      return NextResponse.json({
        message: "Please select some products to checkout",
      });
    }

    const objectIds = products.map((i) => i._id);
    const dbProducts: { _id: string | ObjectId; price: number }[] =
      await productsForCharge(objectIds);

    const productMap = new Map(products.map((i) => [i._id, i.qtyToBuy]));

    const totalBill = dbProducts.reduce((total, current) => {
      const quantity = productMap.get(current._id as string);
      return total + current.price * quantity!;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalBill * 100,
      currency: "usd",
      // automatic_payment_methods: { enabled: true },
      payment_method_types: ["card"],
      metadata: {},
    });
    console.log({ clientSecret: paymentIntent.client_secret, and: products });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error: ", error);
    return NextResponse.json({
      error,
    });
  }
}
