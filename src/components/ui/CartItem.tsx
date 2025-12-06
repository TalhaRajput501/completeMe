'use client'
import React, { useEffect, useState } from 'react'
import QuantityCounter from './QuantityCounter'
import { ProductType } from '@/schemas/product.schema'
import { ObjectId } from 'mongoose';
import Image from 'next/image';
import { eachCartProduct } from '@/app/product/[category]/[id]/[name]/page';

export interface cartProduct {
  _id: string | ObjectId;
  name: string;
  images: string[];
  price: number;
  stock: number
}

interface cartItemProps {
  product: cartProduct;
  localCart: eachCartProduct[], 

}

function CartItem({ product, localCart,   }: cartItemProps) {

  const [quantityToBuy, setQuantityToBuy] = useState<number>(1)

  useEffect(() => {
    localCart.map(item => {
      if (item.product === product._id) {
        setQuantityToBuy(item.quantity)
      }
    }
    )
  }, [])



  return (
    <div className='flex   w-[70%] mt-3 mx-auto  '>
      <div className='flex w-full  border items-center gap-2  '>

        <div className=''>
          {/* Image */}
          {
            product.images.map(image => (
              <div key={image} className='relative w-55 h-32 '>
                <Image className='border rounded' fill src={image} alt={image} />
              </div>
            ))
          }
        </div>

        <div className='flex w-full items-center justify-around'>
          {/* Information */}
          <div className='flex  flex-col ml-2'>
            <div>
              <h1 className='text-lg font-semibold  text-[#11283d] ' >Name:</h1>
              <p>{product.name}</p>
            </div>

            <div>
              <h1 className='text-lg font-semibold  text-[#11283d] ' >Unit Price:</h1>
              <p className=''>
                PKR: &#8203;
                <span className='font-bold   '>
                  {product.price}
                </span>
              </p>
            </div>
          </div>

          {/* Counter */}
          <div className='flex flex-col'>
            <h1 className='text-md font-semibold  text-[#11283d] ' >Quantity:</h1>
            <QuantityCounter
              controlToChangeCart
              deleteIcon
              value={quantityToBuy!}
              setQty={setQuantityToBuy}
              currentProduct={product._id as string}
              className=' p-0.5 px-1 ' />
          </div>

          {/* Total */}
          <div className='w-[25%]  '>
            <h1 className='text-lg font-semibold  text-[#11283d] ' >Total:</h1>
            {
              localCart.map(item => item.product === product._id && (
                <p key={item.product} >
                  PKR: &#8203;
                  <span className='font-bold   '>
                    {product.price * quantityToBuy}
                  </span>
                </p>
              )
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItem
