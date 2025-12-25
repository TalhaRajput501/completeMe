'use client'
import React, { useEffect, useState } from 'react'
import QuantityCounter from './QuantityCounter'
import { ProductType } from '@/schemas/product.schema'
import { ObjectId } from 'mongoose';
import Image from 'next/image';
import { eachCartProduct } from '@/app/product/[category]/[id]/[name]/page';
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks';
import { X } from 'lucide-react';
import { deleteItem } from '@/lib/features/cartSlice';

// db product
export interface cartProduct {
  _id: string // i just remove | ObjectId from here in case any error occur 
  name: string;
  images: string[];
  price: number;
  qtyToBuy: number
}

interface cartItemProps {
  product: cartProduct;
}

function CartItem({ product }: cartItemProps) {

  const [quantityToBuy, setQuantityToBuy] = useState<number>(1)
  const reduxCart = useAppSelector(state => state.cart.products)
  const dispatch = useAppDispatch()


  useEffect(() => {
    reduxCart.forEach(item => {
      if (item._id === product._id) {
        setQuantityToBuy(item.qtyToBuy)
      }
    })
  }, [reduxCart])


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
                <span className='font-bold '>
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
              // setSummary={setSummaryTotal}
              productPrice={product.price}
              currentProductId={product._id as string}
              className=' p-0.5 px-1 '
            />
          </div>

          {/* Total */}
          <div className='w-[25%]  '>
            <h1 className='text-lg font-semibold  text-[#11283d] ' >Total:</h1>
            {
              reduxCart.map(item => item._id === product._id && (
                <p key={item._id} >
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

        {/* cross icon  */}
        <div
          className='relative w-fit h-full  cursor-pointer  '
          onClick={() => dispatch(deleteItem(product._id))}
        >
          <X className='border-[#3dbdf1] text-[#3dbdf1] bg-gray-200 hover:bg-gray-300 border-1 rounded-full p-0.5 absolute top-2 right-2 ' />
        </div>
      </div>
    </div>
  )
}


export default CartItem
