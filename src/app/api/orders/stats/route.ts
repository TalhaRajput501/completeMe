import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";
import { ApiResponse } from "../../../../../types/ApiResponse";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";


// Stats get total orders 
export async function GET(){
  try {
    await dbConnect
    const totalDocuments = await Order.estimatedDocumentCount()
    

    const res : ApiResponse<number>  = {
      data: totalDocuments,
      statusCode: 200,
      success: true
    }
   return NextResponse.json(res)
  } catch (error) {
    let res: ApiResponse = {
      statusCode: 500,
      success: false,
      error: `${error}`
    }
    return res 
  }
}