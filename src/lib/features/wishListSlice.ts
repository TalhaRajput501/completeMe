import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishProduct } from "../../../types/productTypes";



interface initialStateType {
  products: WishProduct[];
}

const initialState: initialStateType = {
  products: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<{ wish: WishProduct }>) => {
      console.log("Adding to wish list:", action.payload.wish);
      state.products.push(action.payload.wish);
    },
    removeFromWishList: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
    },
    updateWishListNote: (
      state,
      action: PayloadAction<{ id: string; note: string }>,
    ) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, note: action.payload.note }
          : product,
      );
    },
  },
});

export const { addToWishList, removeFromWishList, updateWishListNote } =
  wishListSlice.actions;
export default wishListSlice.reducer;
