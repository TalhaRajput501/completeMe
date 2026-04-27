'use client'
import { truncateLetter } from '@/lib/utils'
import { ArrowRight, Heart, } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ImageSkeleton from './ImageSkeleton';
import ParaSkeleton from './ParaSkeleton';
import HeadingSkeleton from './HeadingSkeleton';
import { useEffect, useState } from 'react'
import { ProductInfoCardProps, wishListInLocal, WishProduct } from '../../../types/productTypes'
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks'
import { addToWishList, removeFromWishList } from '@/lib/features/wishListSlice'
import { wishListKey } from './ClientLayout' 

function HomeCard({ product }: { product: ProductInfoCardProps }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const dispatch = useAppDispatch()
  const wishProducts = useAppSelector(state => state.wishList.products)

  useEffect(() => {
    wishProducts.forEach(item => {
      if (item.id === product.id) {
        setIsFavorite(true)
      }
    })
  }, [wishProducts, product.id])
 
  const handleFavourite = (productId: string, e: React.MouseEvent<HTMLButtonElement>)  => {
    e.stopPropagation()
    console.log(productId)

    let localWishList: wishListInLocal[] = JSON.parse(localStorage.getItem(wishListKey) ?? '[]')

    if (localWishList.some(item => item.product === productId)) {
      dispatch(removeFromWishList({ id: productId }))
      localWishList = localWishList.filter(item => item.product !== productId)
      localStorage.setItem(wishListKey, JSON.stringify(localWishList))
      setIsFavorite(false)
    } else {
      setIsFavorite(true)
      const wish: WishProduct = {
        id: product.id,
        image: product.imageSrc,
        name: product.name,
        price: product.price,
        note: '',
      }
      dispatch(addToWishList({ wish }))
      const forLocal: wishListInLocal = {
        product: productId,
        note: '',
      }
      if (localWishList.some((item: wishListInLocal) => item.product === productId)) {
        return
      }
      localWishList.push(forLocal)
      localStorage.setItem(wishListKey, JSON.stringify(localWishList))
    }

  }


  return (
    // <Link key={idx} href={product.link} >
    <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 transition-all">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        {
          product.imageSrc ?
            (
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )
            : (
              <ImageSkeleton />
            )
        }
        {/* Favorite button */}
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFavourite( product.id, e)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform  cursor-pointer"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <product.iconName className="w-5 h-5 text-blue-600" />
          </div>
          {/* Name and fallback is HeadingSkeleton */}
          {
            product.name ?
              (
                <h3 className="text-2xl font-bold text-slate-800">
                  {truncateLetter({ text: product.name, limit: 20 })}
                </h3>
              ) : (
                <HeadingSkeleton />
              )
          }
        </div>
        {/* Description and fall back is ParaSkeleton */}
        {
          product.description ?
            (
              <p className="text-slate-600 mb-4">
                {
                  truncateLetter({
                    text: product.description,
                    limit: 120
                  })
                }
              </p>
            ) : (
              <ParaSkeleton />
            )
        }
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 text-blue-600 font-semibold ">
          <Link href={product.link} >

            <div className="flex items-center gap-2 text-blue-600 font-semibold group ">
              <span>
                View Product
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link >

          <div className="text-slate-900 font-semibold">
            {
              product.price ? `$${product.price}` : <HeadingSkeleton width='w-1/4' />
            }
          </div>
        </div>
      </div>
    </div>
    // </Link >
  )

}

export default HomeCard