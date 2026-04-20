import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { productSchema, ProductType } from "@/schemas/product.schema";
import type { ApiResponse } from "../../../../types/ApiResponse";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadPics(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "e-commerce-products" },
      (error, response) => {
        if (error) reject(error);
        else resolve(response as UploadApiResponse);
      },
    );
    uploadStream.end(buffer);
  });

  return result;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const forLanding = searchParams.get("landing") === "true";
  try {
    await dbConnect();
    let products;
    if (forLanding) {
      let product = await Promise.all([
        Product.find(
          { category: "watch" },
          {
            // _id: 0,
            name: 1,
            description: 1,
            images: 1,
          },
        ).limit(3),
        Product.find(
          { category: "cloth" },
          {
            // _id: 0,
            name: 1,
            description: 1,
            images: 1,
          },
        ).limit(3),
        Product.find(
          { category: "shoe" },
          {
            // _id: 0,
            name: 1,
            description: 1,
            images: 1,
          },
        ).limit(3),
      ]);
      products = { watch: product[0], cloth: product[1], shoe: product[2] } as Record<string, any>; // Initialize as an empty object
    } else {
      products = await Product.find();
    }
    
    const parsedProducts = JSON.parse(JSON.stringify(products));

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        statusCode: 200,
        message: "Products fetched successfully",
        data: parsedProducts,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        statusCode: 500,
        error:
          error instanceof Error
            ? `Error while fetching products: ${error.message}`
            : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    let productPayload: ProductType | null = null;
    let imageUrls: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const productRaw = formData.get("product");

      if (!productRaw || typeof productRaw !== "string") {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            statusCode: 400,
            error: "Product payload is required",
          },
          { status: 400 },
        );
      }

      productPayload = JSON.parse(productRaw) as ProductType;

      const imageFiles = formData
        .getAll("images")
        .filter((item): item is File => item instanceof File && item.size > 0);

      if (imageFiles.length > 0) {
        const uploadResult = await Promise.all(
          imageFiles.map((file) => uploadPics(file)),
        );
        imageUrls = uploadResult.map((res) => res.secure_url);
      }
    } else {
      const body = (await req.json()) as ProductType;
      productPayload = body;
      imageUrls = Array.isArray(body.images) ? body.images : [];
    }

    if (!productPayload) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          statusCode: 400,
          error: "Invalid product payload",
        },
        { status: 400 },
      );
    }

    const parsed = productSchema.safeParse({
      ...productPayload,
      images: imageUrls,
    });

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          statusCode: 400,
          error: parsed.error.issues[0]?.message || "Invalid product data",
        },
        { status: 400 },
      );
    }

    const product = new Product(parsed.data);
    await product.save();
    const savedProduct = JSON.parse(JSON.stringify(product));

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        statusCode: 201,
        message: "Product saved successfully",
        data: savedProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        statusCode: 500,
        error:
          error instanceof Error
            ? `Error while creating product: ${error.message}`
            : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
