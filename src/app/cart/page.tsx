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
  const [total, setTotal] = useState<number>(0)


  // todo  it is doing three things i have to rerun this for making total automatic how to do this 
  // ! i am going to orders page i have to check it with free mind
  useEffect(() => {
    const getCartProduct = async () => {
      // getting product Ids from localstorage
      const cartProductIds = localStorage.getItem('cartProducts')
      
      if (cartProductIds) {

        const jsonCartProductIds: eachCartProduct[] = JSON.parse(cartProductIds)
        setLocalCart(jsonCartProductIds)
        const productIds = jsonCartProductIds.map((pro: eachCartProduct) => (pro.product))
        // getting actual products via aggregation form db
        const products: cartProduct[] = await getProductsWithIds(productIds)
        setCartProducts(products)

        // it will make the total amount that user has to pay in summary box
        if (products) {
          const cartMap = new Map(products?.map(item => [item._id, item]))
          const finalArr = jsonCartProductIds?.map(cart => ({
            ...cartMap.get(cart.product),
            quantity: cart.quantity
          }))

          const result = finalArr?.reduce((acc, curr) => {
            const total = curr.price! * curr.quantity
            return acc + total
          }, 0)
          console.log('this is the result of total shopping that you did in the past decades', finalArr)
          console.log('this is the result of ff shopping that you did in the past decades', products)
          setTotal(result!)
        }
      }
    }
    getCartProduct()
  }, [])

  return (
    <div
      className='   '
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
          {/* <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress firstPage />
          </div> */}

          {/* Cart Items */}

          <div className='flex flex-col mt-7  flex-wrap w-full'>
            <h1 className='text-3xl text-[#11283d] font-bold w-[80%] mx-auto  mb-0.5 '>Cart Items</h1>

            <div className=''>
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

        </div>

        {/*  The vertical line */}
        <div className=" bg-gray-800 h-[calc(100vh-4rem)]"></div>

        {/* Side Bar */}
        <div
          className='w-[30%] '
        >
          {/* todo is ka alag component banana ha k nai??  */}
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
              <p className='font-semibold'>{total}</p>
            </div>

            <div
              className=' w-full border flex items-center mt-9 justify-center   '
            >
              <Link className='w-full' href={'/shipping-details'}>
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
