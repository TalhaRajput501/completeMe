import mongoose, { Document } from "mongoose";

export interface OrderProduct {
  productId: mongoose.Types.ObjectId;
  orderedQuantity: number;
  price: number;
}

export type OrderStatus = "draft" | "pending" | "processing" | "delivered" | "cancelled";  

export interface OrderType extends Document {
  products: OrderProduct[];
  customerInfo?: {
    name: string;
    address: string;
    phone: number;
    email: string;
  };
  paymentIntentId: string;
  status: OrderStatus;
  totalAmount: number;
}

const ordersSchema = new mongoose.Schema<OrderType>(
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
        // required: true,
      },
      address: {
        type: String,
        // required: true,
      },
      phone: {
        type: Number,
        // required: true,
      },
      email: {
        type: String,
        // required: true,
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
      enum: ["draft", "pending", "processing", "delivered", "cancelled"],
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<OrderType>("Order", ordersSchema);
