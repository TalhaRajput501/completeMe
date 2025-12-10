import { cartProduct } from "@/components/ui/CartItem";
import { ProductType } from "@/schemas/product.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  products: cartProduct[];
}

const initialState: initialStateType = {
  products: [ {
    _id: 'talha', // now test the 
    images: ['https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    name: 'hello',
    price: 43,
    stock: 34
  }],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem(state, action: PayloadAction<cartProduct[]>){  
      state.products.push(...action.payload)
    },

  },
});

export default cartSlice.reducer;
export const {setCartItem} = cartSlice.actions
