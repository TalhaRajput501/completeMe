"use server";
import { requireAuth } from "@/utils/authGuard";
import { dbConnect } from "../dbConnect";
import { Order, OrderType } from "@/models/orders.model";
import { Product } from "@/models/product.model";
import mongoose from "mongoose";
import Pusher from "pusher";

// Types

type OrderStats = {
  total: Array<{ total: number }>;
  pending: Array<{ pending: number }>;
  processing: Array<{ processing: number }>;
  delivered: Array<{ delivered: number }>;
  cancelled: Array<{ cancelled: number }>;
  totalRevenue: Array<{ totalRevenue: number }>;
}[];

export type DashboardOrderStatus =
  | "all"
  | "draft"
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled";

type PopulatedOrderProduct = {
  productId: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  orderedQuantity: number;
  price: number;
};

export type OrderTrackingView = Omit<
  OrderType,
  "_id" | "products" | "createdAt" | "updatedAt"
> & {
  _id: string;
  products: PopulatedOrderProduct[];
  createdAt: string;
  updatedAt: string;
};

export type TopSellingProduct = {
  productId: string;
  name: string;
  images: string[];
  price: number;
  totalSold: number;
}

export type StockAlertPayload = {
  id: string;
  images: string[];
  name: string;
  category: string;
  stock: number;
};
// PUSHER Configure

// Get Stats for orders
export const getOrderStats = async () => {
  try {
    await requireAuth();
    await dbConnect();
    const stats: OrderStats = await Order.aggregate([
      {
        $facet: {
          total: [{ $count: "total" }],
          pending: [{ $match: { status: "pending" } }, { $count: "pending" }],
          processing: [
            { $match: { status: "processing" } },
            { $count: "processing" },
          ],
          delivered: [
            { $match: { status: "delivered" } },
            { $count: "delivered" },
          ],
          cancelled: [
            { $match: { status: "cancelled" } },
            { $count: "cancelled" },
          ],
          totalRevenue: [
            { $match: { status: "delivered" } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
              },
            },
          ],
        },
      },
    ]);

    const result = stats[0];

    const totalOrders = result.total[0]?.total || 0;
    const pending = result.pending[0]?.pending || 0;
    const processing = result.processing[0]?.processing || 0;
    const delivered = result.delivered[0]?.delivered || 0;
    const cancelled = result.cancelled[0]?.cancelled || 0;
    const totalRevenue = result.totalRevenue[0]?.totalRevenue || 0;

    // console.log("In server this is the resultt: ", stats);
    // console.log(
    //   "In server the individual values are: ",
    //   totalOrders,
    //   pending,
    //   processing,
    //   delivered,
    //   cancelled,
    //   totalRevenue,
    // );
    return {
      totalOrders,
      pending,
      processing,
      delivered,
      cancelled,
      totalRevenue,
    };
    // return stats
  } catch (error) {
    console.error("Error fetching order stats:", error);
    throw new Error("Failed to fetch order stats");
  }
};

// Get All Orders for admin dashboard
export const getAllOrders = async ({
  page,
  limit,
  filterValue,
}: {
  page: number;
  limit: number;
  filterValue?: DashboardOrderStatus;
}) => {
  try {
    await requireAuth();
    await dbConnect();
    const skip = (page - 1) * limit;
    if (filterValue && filterValue !== "all") {
      const orders: OrderType[] = await Order.find({ status: filterValue })
        .skip(skip)
        .limit(limit);
      return JSON.parse(JSON.stringify(orders));
    }
    const orders: OrderType[] = await Order.find().skip(skip).limit(limit);
    // const totalOrders = await Order.countDocuments();
    return JSON.parse(JSON.stringify(orders)); // If you dont parse and stringify, you will get error:  Maximum call stack size exceeded
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

// Get Orders for search query in admin dashboard
export const searchOrders = async ({ query }: { query: string }) => {
  try {
    await requireAuth();
    await dbConnect();
    const orders: OrderType[] = await Order.find({
      $or: [
        // This is a bit tricky, we want to search by order id as well, but order id is an ObjectId, so we need to convert it to string and then search by regex.
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: query,
              options: "i",
            },
          },
        },
        { paymentIntentId: { $regex: query, $options: "i" } },
        { "customer.name": { $regex: query, $options: "i" } },
        { "customer.email": { $regex: query, $options: "i" } },
        { "products.productName": { $regex: query, $options: "i" } },
      ],
    });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error searching orders:", error);
    throw new Error("Failed to search orders");
  }
};

// Get Images for Each order
export const getOrderProductImages = async (productId: string) => {
  try {
    await requireAuth();
    await dbConnect();

    // Validate productId
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid productId:", productId);
      return [];
    }

    // ✅ Fix: Remove the { _id: ... } wrapper
    const images = await Product.findById(productId).select("images");
    // console.log("Fetched product images for productId:", productId, "Images:", images);
    return JSON.parse(JSON.stringify(images?.images || []));
  } catch (error) {
    console.error("Error fetching order product images:", error);
    return [];
  }
};

// Customer order tracking by payment intent id
export const getOrderByPaymentIntent = async (
  paymentIntentId: string,
): Promise<OrderTrackingView | null> => {
  try {
    await dbConnect();
    const normalizedPaymentIntent = paymentIntentId.trim();
    if (!normalizedPaymentIntent) {
      return null;
    }

    const order = await Order.findOne({
      paymentIntentId: normalizedPaymentIntent,
    })
      .populate({
        path: "products.productId",
        select: "name images price",
      })
      .sort({ createdAt: -1 })
      .lean();

    if (!order) {
      return null;
    }

    return JSON.parse(JSON.stringify(order)) as OrderTrackingView;
  } catch (error) {
    console.error("Error fetching order by payment intent:", error);
    throw new Error("Failed to fetch order tracking data");
  }
};

// Update order status from dashboard actions
export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderType["status"];
}) => {
  try {
    await requireAuth();
    await dbConnect();

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status, updatedAt: new Date() } },
      { new: true },
    );

    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};

// Get Low Stock notification via PUSHER
export const sendStockAlert = async (payload: StockAlertPayload) => {
  if (
    !process.env.PUSHER_APP_ID ||
    !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
    !process.env.PUSHER_SECRET ||
    !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  ) {
    console.warn(
      "Pusher environment variables are missing. Skipping Pusher initialization.",
    );
    return JSON.parse(
      JSON.stringify({ message: "Some error happen on Notification" }),
    ); // Return orders without initializing Pusher if env variables are missing
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  });

  await pusher.trigger("order-channel", "stock-alert-event", payload);
  console.log("Backend sending alert: ", Math.random());
};

// Get Recent Orders for Dashboard
export const getRecentOrders = async () => {
  try {
    await requireAuth();
    await dbConnect();
    const recentOrders: OrderType[] = await Order.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .limit(5);
    return JSON.parse(JSON.stringify(recentOrders));
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw new Error("Failed to fetch recent orders");
  }
};

// Get Top selling products
export const getTopSellingProducts = async () => {
  try {
    await requireAuth();
    await dbConnect();

    const topSellingProducts: TopSellingProduct[] = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalSold: { $sum: "$products.orderedQuantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$productInfo.name",
          images: "$productInfo.images",
          price: "$productInfo.price",
          totalSold: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(topSellingProducts));
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    throw new Error("Failed to fetch top selling products");
  }
};
