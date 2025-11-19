import { ProductType } from "@/schemas/product.schema";
import { createSlice } from "@reduxjs/toolkit";

interface stateType {
  products: ProductType[];
}

const initialState: stateType = {
  products: [
    {
      brand: "Apple",
      category: "watch",
      description:
        "This is the apple macbook pro with m5 chip and build to smoothly work with ai",
      features: ["stainlesssteel"],
      gender: ["men"],
      images: [
        "https://res.cloudinary.com/djdfv5lwo/image/upload/…6039/e-commerce-products/uwugifat62lveli3zire.png",
      ],
      isActive: true,
      material: " Aluminium",
      name: " MacBook Pro 15",
      price: 1,
      sizeOptions: ["40mm"],
      stock: 1,
      tags: ["apple", "macbook", "talha", "billionaire"],
      _id: "68fb8cc779ff40bf06ec57ad",
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
