import { cartProduct } from "@/components/ui/CartItem";
import { ProductType } from "@/schemas/product.schema";
import { createSlice } from "@reduxjs/toolkit";

interface stateType {
  products: cartProduct[];
}

const initialState: stateType = {
  products: [
    {
      _id: "68fb8cc779ff40bf06ec57ad",
      name: " MacBook Pro 15",
      images: [
        "https://res.cloudinary.com/djdfv5lwo/image/upload/…6039/e-commerce-products/uwugifat62lveli3zire.png",
      ],
      price: 1,
      stock: 1,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
