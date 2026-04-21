'use client'
import { Check, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import ImageSkeleton from './ImageSkeleton'
import { truncateLetter } from '@/lib/utils'
import { formatCurrency } from '@/app/wish-list/page'
import { useAppDispatch } from '@/lib/store/reduxHooks'
import { updateWishListNote, removeFromWishList } from '@/lib/features/wishListSlice'
import { WishProduct } from '../../../types/productTypes'


function WishListItem({product}: {product: WishProduct}) {

  const [note, setNote] = useState<string>(product.note ?? '')
  const dispatch = useAppDispatch()

  const handleUpdateNote = () => {
    if(!product.note) return
    dispatch(updateWishListNote({id: product.id, note: product.note}))
  }

  const handleDeleteWishItem = () => {
    dispatch(removeFromWishList({id: product.id}))
  }

  

  return (
    <article
     
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <ImageSkeleton extraClasses="!h-full !w-full !rounded-none" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-800">{truncateLetter({
              text: product.name,
              limit: 17
            })}
            </h2>

            <div className="mt-3">
              <label
                htmlFor={`note-${product.id}`}
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Custom Note
              </label>
              <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-slate-300 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                <textarea
                  id={`note-${product.id}`}
                  maxLength={50}
                  rows={1}
                  defaultValue={product.note ?? ''}
                  placeholder="Add a short note (max 50 letters)"
                  className="h-9 w-full resize-none rounded-l-lg bg-transparent px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none overflow-y-hidden"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={`Save note for ${product.name}`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-r-lg border-l border-slate-300 bg-white text-blue-600 transition-colors hover:bg-blue-50"
                  onClick={handleUpdateNote}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">50 letters max</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <div className="mr-1">
            <p className="text-right text-lg font-semibold text-slate-800">
              {formatCurrency(product.price)}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Move to Cart
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            onClick={handleDeleteWishItem}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}

export default WishListItem