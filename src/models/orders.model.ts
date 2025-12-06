import mongoose, { Document } from "mongoose";

interface Product {
  productId: mongoose.Types.ObjectId;
  orderedQuantity: number;
  price: number;
}

export interface Orders extends Document {
  products: Product[];
  customerInfo: {
    name: string;
    address: string;
    phone: number;
  };
  paymentIntentId: string;
  status: string;
  totalAmount: number;
}

const ordersSchema = new mongoose.Schema<Orders>(
  {
    products: [
      {
        _id: false,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        orderedQuantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "delivered", "cancelled"],
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

export const Orders =
  mongoose.models.Order || mongoose.model<Orders>("Order", ordersSchema);
