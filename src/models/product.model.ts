import mongoose, { Document } from "mongoose";

export interface Product extends Document {
  name: string;
  images: string[];
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  tags: string[];
  category: string;
  // optional  fields
  brand?: string;
  gender?: string;
  material?: string;
  features?: string[];
  sizeOptions?: string[];
}

const productSchema = new mongoose.Schema<Product>(
  {
    // universal product
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['watch','cloth','shoe'],
      default: 'watch'
    },


    // optional fields depend on category
    brand: String,
    material: String,
    features: [String],
    gender: {
      type : [String],
      enum: {
        values: ['men', 'women', 'unisex'],
        message: '{VALUE} is not a valid gender option'
      },
      default: ['men']
    },
    sizeOptions: [String],
  },
  { timestamps: true }
);

// But if i go with the names you have 

export const Product =  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);