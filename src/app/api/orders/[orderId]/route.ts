import { dbConnect } from "@/lib/dbConnect";
import { Order, OrderProduct } from "@/models/orders.model";
import { Product } from "@/models/product.model";
import { sendStockAlert } from "@/lib/actions/orders.actions";
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
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return NextResponse.json<ApiResponse>(
        {
          statusCode: 404,
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      );
    }

    const isPlacingOrder =
      existingOrder.status === "draft" && body.status === "pending";

    if (isPlacingOrder) {
      const bulkUpdate = existingOrder.products.map((item: OrderProduct) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { stock: -item.orderedQuantity } },
        },
      }));

      if (bulkUpdate.length > 0) {
        await Product.bulkWrite(bulkUpdate);
      }

      const productIds = existingOrder.products.map(
        (item: OrderProduct) => item.productId,
      );
      const updatedProducts = await Product.find({ _id: { $in: productIds } }).select(
        "images name category stock",
      );

      const lowStockProducts = updatedProducts.filter((product) => product.stock <= 5);
      for (const product of lowStockProducts) {
        await sendStockAlert({
          id: product._id.toString(),
          images: product.images || [],
          name: product.name,
          category: product.category,
          stock: product.stock,
        });
      }
    }

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
    console.error("Error in PATCH /api/orders/[orderId]:", error);
    return NextResponse.json<ApiResponse>({
      statusCode: 500,
      success: false,
      error: "Error while placing order",
    });
  }
}

