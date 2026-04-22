'use client'
import React from 'react'
import QuantityCounter from './QuantityCounter'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/store/reduxHooks'
import { X } from 'lucide-react'
import { deleteItem } from '@/lib/features/cartSlice'
import { cartProduct } from '../../../types/productTypes'


interface cartItemProps {
  product: cartProduct
}

function CartItem({ product }: cartItemProps) {
  const dispatch = useAppDispatch()
  const previewImage = product.images?.[0]
  const totalPrice = product.price * product.qtyToBuy

  return (
    <article className='relative rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4'>
      <button
        type='button'
        className='absolute right-2 top-2 rounded-full border border-blue-200 bg-white p-1 text-blue-500 transition-colors hover:bg-blue-50'
        onClick={() => dispatch(deleteItem(product._id))}
        aria-label='Remove product from cart'
      >
        <X className='h-4 w-4' />
      </button>

      <div className='flex flex-col gap-4 sm:flex-row'>
        <div className='relative h-40 w-full overflow-hidden rounded-lg border border-slate-200 bg-white sm:h-28 sm:w-44 sm:shrink-0'>
          {previewImage ? (
            <Image className='object-cover' fill src={previewImage} alt={product.name} />
          ) : (
            <div className='flex h-full items-center justify-center text-sm text-slate-400'>
              No image
            </div>
          )}
        </div>

        <div className='grid flex-1 gap-4 sm:grid-cols-3 sm:items-center'>
          <div>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Product</h2>
            <p className='text-base font-semibold text-slate-800'>{product.name}</p>
            <p className='mt-1 text-sm text-slate-600'>
               <span className='font-semibold text-slate-800'>${product.price}</span> / unit
            </p>
          </div>

          <div className='sm:justify-self-center'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Quantity</h2>
            <div className='mt-1'>
              <QuantityCounter
                controlToChangeCart
                deleteIcon
                qtyToBuy={product.qtyToBuy}
                productPrice={product.price}
                currentProductId={product._id}
                className='px-2 py-1 text-base'
              />
            </div>
          </div>

          <div className='sm:justify-self-end'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Total</h2>
            <p className='text-lg font-bold text-slate-800'>$ {totalPrice}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem
