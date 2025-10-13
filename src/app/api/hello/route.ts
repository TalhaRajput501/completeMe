import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Orders } from "@/models/orders.model";
import { Product } from "@/models/product.model";
import mongoose from "mongoose";
import { User } from "@/models/user.model";
import bcrypt from 'bcrypt'


export async function GET() {
  await dbConnect();
  const fakeOrder = {
    products: [
      {
        orderedQuantity: 4,
        price: 24,
        productId: new mongoose.Types.ObjectId(),
      },
    ],
    customerInfo: {
      name: "tahla",
      address: "4",
      phone: 2343234,
    },
    totalAmount: 34,
  };
  const fakeProduct = {
    name: 'talha',
    images: ['pic'],
    description: 'string',
    price: 2,
    stock: 34,
    isActive: true,
    tags: ['billionaire'],
  };

  // const order = new Orders(fakeOrder);
  // const product = new Product(fakeProduct) 


  const pass = await bcrypt.hash('talha', 10)
 
  const user = {
    username:'talha',
    password: pass,
    storeCategory: 'watch'

  }
  // const newUser = new User(user)
  // await newUser.save()


  // await order.save();
  // await product.save();  

  return NextResponse.json({
    msg: "i dont know but how but it is working",
  });
}
