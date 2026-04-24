import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/orders.model";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../../../types/ApiResponse";
import { StatsData } from "@/hooks/useStats";
import { requireAuth } from "@/utils/authGuard";

type statsRes = [number, number, {totalAmount: number}[]]

export async function GET(){

  try {
     await requireAuth()
    // const {session} = await requireAuth('admin')


    await dbConnect()

    const response: statsRes = await Promise.all([
      Order.estimatedDocumentCount(),
      Product.estimatedDocumentCount(),
      Order
      .find({
        status: 'delivered'
      })
      .select({
        totalAmount: 1,
        _id: 0
      }),

    ])
    
    // calculate the revenue 
    const payment = response[2].reduce((acc, cur) => 
      acc += cur.totalAmount
    , 0)

    
    const data: StatsData = {
      order: response[0],
      products: response[1],
      revenue: payment,
      activeCustomers: 3
    } 

    const res: ApiResponse<StatsData> = {
      data: data,
      success: true,
      statusCode: 200
    }

    return NextResponse.json(res)

  } catch (error) {
    return NextResponse.json<ApiResponse>({
      statusCode: 500,
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }


}