"use server";
import { ProductType } from "@/schemas/product.schema";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { productSchema } from "@/schemas/product.schema";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { ObjectId } from "mongodb";
import { cartProduct } from "@/components/ui/CartItem";

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
  await dbConnect();
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
    await dbConnect();
    const products = await Product.find();
    //
    // const object = products.map(p => p.toObject({versionKey:false,}))
    // console.log('this is products ',products)
    // console.log('this is object ',object)
    const parsedProducts = JSON.parse(JSON.stringify(products));
    return parsedProducts;
  } catch (error) {
    console.log("Error occur in getProducts", error);
  }
};

// Get single products
export const singleProduct = async (id: string) => {
  try {
    await dbConnect();
    const typedId = new ObjectId(id);
    const product = await Product.findOne({ _id: typedId });
    const parsedProduct = JSON.parse(JSON.stringify(product));
    return parsedProduct;
  } catch (error) {
    console.log("Error in singleProduct", error);
  }
};

// Get Products with list of ID's
export const getProductsWithIds = async (productIds: (string | ObjectId)[]) => {
  try {
    // console.log('this is array of ids coming from frontend', productIds)
    await dbConnect();
    const validObjectIds = productIds.map((id) =>
      typeof id === "string" ? new ObjectId(id) : id
    );

    // const products = await Product.find({ _id: { $in: validObjectIds } });
    const aggre: cartProduct[] = await Product.aggregate([
      {
        $match: {
          _id: {
            $in: validObjectIds,
          },
        },
      },
      {
        $project: {
          _id: 1,
          images: 1,
          name: 1, 
          price: 1,
          // stock: 1, // comment it because i think it is not being used any where
        },
      },
    ]);
    const parsedProducts = JSON.parse(JSON.stringify(aggre));
    // console.log('this is what going out in return ', parsedProducts)
    return parsedProducts;
  } catch (error) {
    console.log("Error in getProductwithIds", error);
  }
};


// products for calculating total bill in payment intent
export const productsForCharge = async(products: (string | ObjectId)[]) => {
  try {
    await dbConnect()

    const objectIds = products.map(i => typeof i === 'string' ? new ObjectId(i) : i)

    const finalResult = await Product.aggregate([
      {
        $match: {
          _id: {
            $in: objectIds
          }
        }
      }, 
      {
        $project: {
          _id: 1,
          price: 1
        }
      }
    ])

    const parsedProducts = JSON.parse(JSON.stringify(finalResult))
    return parsedProducts

  } catch (error) {
    console.log('Error in productsforcharge ', error)
  }
}