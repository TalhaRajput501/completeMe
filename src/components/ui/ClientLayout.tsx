'use client'
import React, { useEffect } from 'react'
import { getProductsWithIds } from "@/lib/actions/products.actions";
import { store } from "@/lib/store/store";
import { cartProduct, eachCartProduct, wishListInLocal, WishProduct } from '../../../types/productTypes';
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { addCartItems } from "@/lib/features/cartSlice";
import { addToWishList } from '@/lib/features/wishListSlice'

export const wishListKey = 'wishlist'
export const cartKey = 'cartProducts'
function ClientLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getCartProducts = async () => {
      const localCart = localStorage.getItem(cartKey)
      const wishList = localStorage.getItem(wishListKey)


      // * For Cart 
      if (localCart) {

        const jsonCart = JSON.parse(localCart) // this array
        const idsArrForProduct = jsonCart.map((item: eachCartProduct) => item.product)

        // getting actual products via aggregation form db
        const products: cartProduct[] = await getProductsWithIds(idsArrForProduct)

        const productMap = new Map(jsonCart.map((item: eachCartProduct) => ([item.product, item.quantity])))

        const productsWithQty: cartProduct[] = products.map(item => {
          const quantity: number = productMap.get(item._id) as number
          return { ...item, qtyToBuy: quantity }
        })

        // console.log('products in clientLayout', products)
        // console.log('products with quantity in clientLayout', productsWithQty)
        // console.log('products Map clientLayout', productMap)

        dispatch(addCartItems(productsWithQty))

      }
      // * For Wish List
      if (wishList) {

        const jsonWishList: wishListInLocal[] = JSON.parse(wishList)
        const ids = jsonWishList.map((item: wishListInLocal) => item.product)

        const products: cartProduct[] = await getProductsWithIds(ids)

        const productMap = new Map(jsonWishList.map(item => [item.product, item.note]))

        const final: WishProduct[] = products.map((item) => {
          const note = productMap.get(item._id)
          return {
            id: item._id,
            image: item.images[0],
            name: item.name,
            price: item.price,
            note,
          }
        })

        final.forEach(product => {
          dispatch(addToWishList({ wish: product }))
        });
      }

    }
    getCartProducts()

    const unsubscribe = store.subscribe(() => {
      // as my redux store change i have to save that snapshopt of store in localstorage 
      const currentState = store.getState()
      // * For Cart
      const products: cartProduct[] = currentState.cart.products
      const arrForLocal: eachCartProduct[] = products.map(item => ({ product: item._id, quantity: item.qtyToBuy }))
      // * For WishList
      const wishList: WishProduct[] = currentState.wishList.products
      const wishForLocal: wishListInLocal[] = wishList.map(item => ({ product: item.id, note: item.note ?? '' }))

      if (products.length === 0) {
        localStorage.removeItem(cartKey)
      } 
      else if (wishForLocal.length === 0) {
        // console.log('this is going in localstorage in subscriber', arrForLocal)
        localStorage.removeItem(wishListKey)
      } 
      else {
        localStorage.setItem(cartKey, JSON.stringify(arrForLocal))
        localStorage.setItem(wishListKey, JSON.stringify(wishForLocal))
      }
    })

    return () => unsubscribe()

  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default ClientLayout
