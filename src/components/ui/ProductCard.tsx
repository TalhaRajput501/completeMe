import { ProductType } from '@/schemas/product.schema'
import Image from 'next/image'
import ImageSkeleton from './ImageSkeleton'
import React from 'react'
import Link from 'next/link'
import { truncateLetter } from '@/lib/utils'

export default function ProductCard({ product, viewMode }: { product: ProductType, viewMode: 'grid' | 'list' }) {
  return (
    <Link
      
      href={`/product/${product.category}/${product._id}/${product.name.replaceAll(' ', '-')}`}
      className="group"
    >
      <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}`}>
        {/* Product Image */}
        <div className={`relative bg-slate-50 overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full aspect-square'}`}>
          {
            product.images[0] ?
              (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fill
                />
              ) : (
                <ImageSkeleton extraClasses={`w-full h-full ${viewMode === 'list' ? '!w-48 !h-48' : 'aspect-square'}`} />
              )
          }
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {truncateLetter({ text: product.name, limit: 25 })}
            </h3>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                ${product.price}
              </p>
              {product.brand && (
                <p className="text-xs text-slate-500 mt-1">{product.brand}</p>
              )}
            </div>

            {product.stock > 0 ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
