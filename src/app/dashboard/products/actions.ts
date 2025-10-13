"use server";
import { ProductType } from "@/schemas/product.schema";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { productSchema } from "@/schemas/product.schema";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

type CloudResponse = {
  secure_url: string;
  public_id: string;
  [key: string]: any;
};
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// this functin can be reuse
async function uploadPics(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "e-commerce-products" },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
  return result;
}

export const addProduct = async (product: ProductType, images: File[]) => {
  console.log("this is coming from frontend", product, images);
  dbConnect();
  try {
    if (images.length <= 0) {
      console.log("pics are not reaching in backend");
      console.log(images);
      return;
    }

    const uploadResult = await Promise.all(
      images.map((file) => uploadPics(file))
    );

    // console.log("this is the upload result", uploadResult);

    const url_arr = uploadResult.map((res: any) => res.secure_url);
    console.log("this is the url arr and will go the database", url_arr);

    const parsed = productSchema.safeParse({ ...product, images: url_arr });

    if (!parsed.success) {
      const message = parsed.error.issues.map((e) => e.message);
      console.error("this is message", message);
      return;
    } else {
      const pro = new Product({ ...product, images: url_arr });
      await pro.save();
      console.log("product is saved successfully ");
    }
  } catch (error) {
    console.log("something happen in add Product", error);
  }
};
