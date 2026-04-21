import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../../../../types/ApiResponse";



// For Single Order


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    console.log("---------entering in orders api---------");
    const { orderId } = await params;
    // console.log('order id getting ',orderId )
    const body = await req.json();
    
    await dbConnect();
    // console.log("the whole body ", body);
    const order = await Order.findByIdAndUpdate(
      orderId,
      { customerInfo: body.customerInfo, status: body.status },
      { new: true }
    );

    // console.log("new order ", order);
    return NextResponse.json<ApiResponse>({
      message: "Order placed successfully",
      statusCode: 200,
      success: true,
      data: order,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>({
      statusCode: 500,
      success: false,
      error: "Error while placing order",
    });
  }
}

