import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../../../types/ApiResponse";
import Stripe from "stripe";
import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";

export async function internalCancelAndRefundOrder(
  paymentIntentId: string,
): Promise<Stripe.Response<Stripe.Refund>> {

  if (process.env.STRIPE_SECRET_KEY === undefined) {
    throw new Error("Stripe secret key is required");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  if (!paymentIntentId) throw new Error("Payment intent ID is required");
// before refunding the payment intent we have to check if the payment intent is already refunded or not. if it is already refunded then we have to throw an error.and if order is delivered then we have to throw an error. and if order is already cancelled then we have to throw an error.
  await dbConnect();
  const order = await Order.findOne({ paymentIntentId: paymentIntentId });
  if (!order) throw new Error("Order not found");
  if (order.status === "cancelled") throw new Error("Order is already cancelled");
  if (order.status === "delivered") throw new Error("Order is already delivered and cannot be cancelled");
  
  let refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
  })

  // now we have to see if refund success
  if (refund.status !== "succeeded") throw new Error("Failed to cancel the payment intent");

  await dbConnect();
  await Order.findOneAndUpdate(
    { paymentIntentId: paymentIntentId },
    { status: "cancelled" },
    { new: true }
  );

  return refund;
}



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentIntentId } = body;
    if (!paymentIntentId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing paymentIntentId",
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    let refund = await internalCancelAndRefundOrder(paymentIntentId);
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        statusCode: 200,
        message: "Payment intent canceled successfully",
        data: refund,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/cancel-order:", error);
    return NextResponse.json<ApiResponse>(
      {
        statusCode: 500,
        success: false,
        error: "Error canceling the order",
      },
      { status: 500 },
    );
  }
}
