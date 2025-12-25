'use client'
import React, { useEffect } from 'react'
import { getProductsWithIds } from "@/lib/actions/products.actions";
import { cartProduct } from "@/components/ui/CartItem";
import { store } from "@/lib/store/store";
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { addCartItems } from "@/lib/features/cartSlice";
import { eachCartProduct } from '@/app/product/[category]/[id]/[name]/page';

function ClientLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getCartProducts = async () => {

      const localCart = localStorage.getItem('cartProducts')
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
    }
    getCartProducts()

    const unsubscribe = store.subscribe(() => {
      // as my redux store change i have to save that snapshopt of store in localstorage 
      const currentState = store.getState()
      const products: cartProduct[] = currentState.cart.products
      const arrForLocal = products.map(item => ({ product: item._id, quantity: item.qtyToBuy }))
      if (products.length === 0) {
        localStorage.removeItem('cartProducts')
      } else {
        // console.log('this is going in localstorage in subscriber', arrForLocal)
        localStorage.setItem('cartProducts', JSON.stringify(arrForLocal))
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
