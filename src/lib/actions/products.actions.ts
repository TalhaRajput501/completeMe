"use server";
import { ProductType } from "@/schemas/product.schema";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import { productSchema } from "@/schemas/product.schema";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { ObjectId } from "mongodb";
import { toast } from "sonner";
import { User } from "@/models/user.model";
import {
  cartProduct,
  FilterOption,
  ProductCategory,
} from "../../../types/productTypes";
import { requireAuth } from "@/utils/authGuard";
import { CategoryOption, SelectOption } from "../../../types/productStyle";

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
      },
    );
    uploadStream.end(buffer);
  });
  return result;
}

// Funtion to refund stripe payment in case if order cant create successfully after payment

// Add Product
export const addProduct = async (product: ProductType, images: File[]) => {
  console.log("this is coming from frontend", product, images);
  
  try {
    await requireAuth()
    if (images.length <= 0) {
      console.log("Please upload at least one image");
      console.log(images);
      return;
    }
    await dbConnect();

    const uploadResult = await Promise.all(
      images.map((file) => uploadPics(file)),
    );

    console.log("this is the upload result", uploadResult);

    const url_array = uploadResult.map((res) => res.secure_url);
    console.log("this is the url arr and will go the database", url_array);

    const parsed = productSchema.safeParse({ ...product, images: url_array });

    if (!parsed.success) {
      const message = parsed.error.issues.map((e) => e.message);
      console.error("this is message", message);
      toast.error(`${message}`);
      return;
    } else {
      const pro = new Product({ ...product, images: url_array });
      await pro.save();
      console.log("product is saved successfully ");
      toast.success("Product saved successfully.");
    }
  } catch (error) {
    console.log("something happen in add Product", error);
  }
};

// Get Single Products
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

// Get all products
export const getProducts = async (page: number, limit: number = 12) => {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);

    const parsedProducts = JSON.parse(JSON.stringify(products));
    return parsedProducts;
  } catch (error) {
    console.log("Error occur in getProducts", error);
    throw new Error("Error in getProducts");
  }
};

// Get Products by category with pagination
export const getProductsByCategory = async (
  category: ProductCategory,
  page: number,
  limit: number = 12,
) => {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const products = await Product.find({ category }).skip(skip).limit(limit);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error occur in getProductsByCategory", error);
    throw new Error("Error in getProductsByCategory");
  }
};

// Get Products with Filters For Category Page
export const getProductsWithFilters = async (
  category: ProductCategory,
  page: number,
  limit: number = 12,
  filter: FilterOption[],
) => {
  // category, page, limit, filter[]
  try {
    await dbConnect();

    const filterQuery: Record<string, 1 | -1> = {}
    filter.map((filter) => {
      switch (filter) {
        case 'name':
          filterQuery.name = 1 
          break;
        case 'newest':
          filterQuery.createdAt = -1
          break;
        case 'price-high':
          filterQuery.price = -1
          break;
        case 'price-low':
          filterQuery.price = 1
          break
        default:
          break;
      }
    });
    const skip = (page -1) * limit
    const products = await Product.find({ category }).sort(filterQuery).skip(skip).limit(limit)
    console.log('These are the product going from backend with filters', products)
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error("Error occur in getProductsWithFilters", error);
    throw new Error("Error in getProductsWithFilters");
  }
};

// Get Products with multiple filters for dashboard page
export const filteredProducts = async (
  { selectedGenders, 
    selectedCategory, 
    selectedFeatures, 
    selectedSize, 
    page, 
    limit = 12 
  } : 
  { selectedGenders: SelectOption[]; 
    selectedCategory: CategoryOption; 
    selectedFeatures: SelectOption[]; 
    selectedSize: SelectOption[], 
    page: number, 
    limit: number 
  }
) => {
  try {
    await dbConnect()
    const skip = (page -1) * limit
    const products = await Product.find({
      $and: [
        { category: selectedCategory.value },
        { gender: { $in: selectedGenders.map(g => g.value) } },   
        {
          $or: [
            ...(selectedSize.length > 0 ? [{ 
              sizeOptions: { $in: selectedSize.map(s => s.value) } 
            }] : []),
            ...(selectedFeatures.length > 0 ? [{ 
              features: { $in: selectedFeatures.map(f => f.value) } 
            }] : [])
          ]
        }
      ]
    }).skip(skip).limit(limit)
    console.log('These are the product going from backend with filters for dashboard', products)
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error("Error occur in filteredProducts", error);
    throw new Error("Error in filteredProducts");
  }
}


// Get Products for Search Query
export const getProductsBySearchQuery = async (page: number, limit: number = 12, query: string) => {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).skip(skip).limit(limit);
    return JSON.parse(JSON.stringify(products));
  }
    catch (error) {
      console.log("Error occur in getProductsBySearchQuery", error);
      throw new Error("Error in getProductsBySearchQuery");
    }
}

// Get Products by list of ID's
export const getProductsWithIds = async (productIds: (string | ObjectId)[]) => {
  try {
    // console.log('this is array of ids coming from frontend', productIds)
    await dbConnect();
    const validObjectIds = productIds.map((id) =>
      typeof id === "string" ? new ObjectId(id) : id,
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

// Get products for calculating total bill in payment intent
export const productsForCharge = async (products: (string | ObjectId)[]) => {
  try {
    await dbConnect();

    const objectIds = products.map((i) =>
      typeof i === "string" ? new ObjectId(i) : i,
    );

    const finalResult = await Product.aggregate([
      {
        $match: {
          _id: {
            $in: objectIds,
          },
        },
      },
      {
        $project: {
          _id: 1,
          price: 1,
        },
      },
    ]);

    const parsedProducts = JSON.parse(JSON.stringify(finalResult));
    return parsedProducts;
  } catch (error) {
    console.error("Error in productsforcharge ", error);
  }
};

export const uploadBannerImg = async (images: File[]) => {
  try {
    await requireAuth()
    if (!images) return;
    await dbConnect();
    const res = await Promise.all(images.map((file) => uploadPics(file)));
    const imgUrls = res.map((r) => r.secure_url);
    await User.updateOne({ role: "admin" }, { bannerImages: imgUrls });
    console.log("Images urls", imgUrls);
  } catch (error) {
    console.error("Something went wrong while uploading banner", error);
  }
};

// Get Products for Suggestions in end of a product page  
export const getSuggestionProducts = async (limit: number = 4) => {
  try {
    await dbConnect();  
    const products = await Product.aggregate([
      { $sample: { size: limit } }
    ]);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error in getSuggestionProducts", error);
    throw new Error("Error in getSuggestionProducts");
  }
}

// Get Products Stats For dashboard
export async function getProductStats() { 
  try {
    await requireAuth()
    await dbConnect();
    const total = await Product.countDocuments();
    const active = await Product.countDocuments({ stock: { $gt: 0 } });
    const lowStock = await Product.countDocuments({ stock: { $lte: 5, $gt: 0 } });
    const outOfStock = await Product.countDocuments({ stock: 0 });
    const totalValueAggre = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
        },  
      },
    ]);
    const totalValue: number = totalValueAggre[0]?.totalValue || 0;
    return { total, active, lowStock, outOfStock, totalValue }
  } catch (error) {
    console.error('Error in getProductStats', error)  
    throw new Error('Error in getProductStats')
  }
}

// Update Products Functions

export const changeStatus = async (ids: Set<string>, activate: boolean) => {
  try {
    await requireAuth()
    await dbConnect();
    const typedIds = Array.from(ids).map(id => new ObjectId(id));
    await Product.updateMany(
      { _id: { $in: typedIds } },
      { $set: { isActive: activate, updatedAt: new Date() } },
    );
    console.log(`Product ${activate ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    console.error('Error in changeStatus', error)
    throw new Error('Error in changeStatus')
  }
}




// Delete Products Functions

// Delete Signle Product 
export const deleteProduct = async (id: string) => {
  try {
    await requireAuth()
    await dbConnect();
    const typedId = new ObjectId(id);
    await Product.deleteOne({
      _id: typedId,
    }); 
    // console.log('Product deleted successfully')
  }
    catch (error) {
      console.error('Error in deleteProduct', error)
    }
}


// Delete Multiple Products
export const deleteMultipleProducts = async (ids: string[]) => {
  try {
    await requireAuth()
    await dbConnect();
    const objectIds = ids.map(id => new ObjectId(id));
    await Product
    .deleteMany({
      _id: {
        $in: objectIds
      }
    })

  } catch (error) {
    console.error('Error in deleteMultipleProducts', error)
  }
}

 