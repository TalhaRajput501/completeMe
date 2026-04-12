import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";
import { NextResponse } from "next/server";



// For Single Order


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    console.log("---------entering in orders api---------");
    const { orderId } = await params;
    console.log('order id getting ',orderId )
    const body = await req.json();

    await dbConnect();
    console.log("the whole body ", body);
    const order = await Order.findByIdAndUpdate(
      orderId,
      { customerInfo: body.customerInfo },
      { new: true }
    );

    console.log("new order ", order);
    return NextResponse.json({
      message: "Order placed successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while placing order",
    });
  }
}

