import { cartProduct } from "@/components/ui/CartItem";
import { ProductType } from "@/schemas/product.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface initialStateType {
  products: cartProduct[];
}

// default state
const initialState: initialStateType = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems(state, action: PayloadAction<cartProduct[]>) {
      state.products.push(...action.payload); // expecting array and then spreading it in state
    },
    updateQuantity(
      state,
      action: PayloadAction<{ currentProductId: string; updatedValue: number }>
    ) {
      state.products = state.products.map((item) =>
        item._id === action.payload.currentProductId
          ? { ...item, qtyToBuy: action.payload.updatedValue }
          : { ...item }
      );
    },
    deleteItem(state , action: PayloadAction<string>) {
       
      state.products = state.products.filter((item) => item._id !== action.payload)
    }
  },
});

export const { addCartItems, updateQuantity, deleteItem } = cartSlice.actions;

export const selectCartTotal = (state: RootState) => {
  return state.cart.products.reduce(
    (total, item) => total + item.price * item.qtyToBuy,
    0
  );
};

export default cartSlice.reducer;
