'use client'
import CartItem, { cartProduct } from '@/components/ui/CartItem'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { eachCartProduct } from '../product/[category]/[id]/[name]/page'
import { getProductsWithIds } from '@/lib/actions/products.actions'
import { ProductType } from '@/schemas/product.schema'
import EmptyCart from '@/components/ui/EmptyCart'


export default function Page() {

  const [cartProducts, setCartProducts] = useState<cartProduct[] | null>(null)
  const [localCart, setLocalCart] = useState<eachCartProduct[] | null>(null)

  useEffect(() => {
    const getCartProduct = async () => {
      const cartProductIds = localStorage.getItem('cartProducts')
      if (cartProductIds) {
        const jsonCartProductIds = JSON.parse(cartProductIds)
        setLocalCart(jsonCartProductIds)
        const productIds = jsonCartProductIds.map((pro: eachCartProduct) => (pro.product))
        const products = await getProductsWithIds(productIds)
        console.log('these are the prodict coming with aggregation', products)
        setCartProducts(products)
      }
    }
    getCartProduct()
  }, [])

  return (
    <div
      className='  '
    >
      { /* Cart Product and Side Bar */}
      <div
        className='w-full justify-center   flex item-center '
      >
        {/* Products */}
        <div
          className='w-[70%] mx-auto flex flex-col'
        >
          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress firstPage />
          </div>

          {/* Cart Items */}

          <div className='flex flex-col mt-7 flex-wrap w-full'>
            <h1 className='text-3xl text-[#11283d] font-bold mx-auto w-[70%] mb-0.5 '>Cart Items</h1>
            {
              cartProducts && localCart ? (
                cartProducts.map(eachProduct => (
                  <CartItem key={eachProduct.name} product={eachProduct} localCart={localCart} />
                ))
              ) : ( 
                <EmptyCart />
              )
            }

          </div>

        </div>

        {/*  The vertical line */}
        <div className="w-px bg-gray-800 h-[calc(100vh-4rem)]"></div>

        {/* Side Bar */}
        <div
          className='w-[30%]     '
        >
          {/* Order summary box */}
          <div className='m-6 p-6 pt-4 sticky inset-0 top-11 bg-[#c0e8fb] text-[#11283d] rounded'>
            <h1 className='font-bold text-2xl'>Order Summary</h1>

            <div className='flex justify-between mt-0.5'>
              <p>Products</p>
              <p className='font-semibold'>444</p>
            </div>

            <div className='flex justify-between mt-0.5'>
              <p>Discount</p>
              <p className='font-semibold'>43</p>
            </div>

            <hr className="border-none h-0.5 bg-gray-900 mt-2" />

            <div className='flex justify-between mt-0.5'>
              <p>Total</p>
              <p className='font-semibold'>3443</p>
            </div>

            <div className=' w-full border flex items-center mt-9 justify-center   '>
              <Link className='w-full' href={'/checkout'}>
                <button className='w-full bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold'>
                  Continue to Checkout
                </button>
              </Link>


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
