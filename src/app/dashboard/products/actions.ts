"use server";
import { ProductType } from "@/schemas/product.schema";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { productSchema } from "@/schemas/product.schema";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// this functin can be reuse
async function uploadPics(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "e-commerce-products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!);
      }
    );
    uploadStream.end(buffer);
  });
  return result;
}

// Add Product
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

    console.log("this is the upload result", uploadResult);

    const url_array = uploadResult.map((res) => res.secure_url);
    console.log("this is the url arr and will go the database", url_array);

    const parsed = productSchema.safeParse({ ...product, images: url_array });

    if (!parsed.success) {
      const message = parsed.error.issues.map((e) => e.message);
      console.error("this is message", message);
      return;
    } else {
      const pro = new Product({ ...product, images: url_array });
      await pro.save();
      console.log("product is saved successfully ");
    }
  } catch (error) {
    console.log("something happen in add Product", error);
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const products = await Product.find();
    //
    // const object = products.map(p => p.toObject({versionKey:false,}))
    // console.log('this is products ',products)
    // console.log('this is object ',object)
    const parsedProducts = JSON.parse(JSON.stringify(products));
    return parsedProducts;
  } catch (error) {
    console.log("Error occur in getProduct", error);
  }
};
