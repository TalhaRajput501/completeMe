'use client'
import { singleProduct } from '@/lib/actions/products.actions'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/schemas/product.schema'
import { Badge } from '@/components/ui/badge'
import LoadingIcon from '@/components/ui/LoadingIcon'
import StockStatusPill from '@/components/ui/StockStatusPill'
import Card from '@/components/ui/Card'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'
import { useAppDispatch } from '@/lib/store/reduxHooks'
import { addCartItems } from '@/lib/features/cartSlice'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { ChevronRight, Share2, Heart, ShoppingCart, Star, CheckCircle, TruckIcon, RefreshCw, Shield } from 'lucide-react'
import Link from 'next/link'


// local storage product
export interface eachCartProduct {
  product: string;
  quantity: number;
}

export default function Page() {

  const cartProducts = useSelector((state: RootState) => state.cart.products)
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [cartValue, setCartValue] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const dispatch = useAppDispatch()

  const params = useParams()
  const { id, name } = params

  useEffect(() => {
    if (!params?.id) return
    const getProduct = async () => {
      setLoading(true)
      const stringId = id as string
      const product = await singleProduct(stringId)
      setProduct(product)
      console.log('object')
      console.log('this is the product and yes ', product)
      setLoading(false)
    }
    getProduct()
  }, [params.id])


  const addToCart = () => {
    console.log(product)
    const oldCart = localStorage.getItem('cartProducts')
    // console.log('this is oldcart ', oldCart)

    if (oldCart) {
      const oldJson = JSON.parse(oldCart)
      if (oldJson.length !== 0) {
        let newCart = oldJson
        const exists = oldJson.find((item: eachCartProduct) => item.product === id)
        if (exists) {
          newCart = oldJson.map((item: eachCartProduct) => {
            if (item.product === id) {
              const newItem = { ...item, quantity: cartValue }
              // dispatch(addNewItem([newItem]))
              return newItem
            } else {
              return item
            }
          }
          )

        } else {
          newCart.push({ product: id, quantity: cartValue })

        }


        // console.log('this is new Cart', newCart)
        localStorage.setItem('cartProducts', JSON.stringify(newCart))
      }
    } else {
      localStorage.setItem('cartProducts', JSON.stringify([{ product: id, quantity: cartValue }]))
    }

  }

  if (loading || !product) {
    return <LoadingIcon />
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {
        product && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/products/${product.category}`} className="hover:text-slate-900 transition-colors capitalize">
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 mb-6">

              {/* Images and Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images Section */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-square">
                    <InnerImageZoom
                      src={product.images[selectedImage]}
                      zoomType="hover"
                      zoomScale={2}
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                    </button>

                    {/* Product Status Badge */}
                    {product.stock === 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Only {product.stock} left!
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((url, idx) => (
                      <button
                        key={url}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx 
                            ? 'border-blue-500 scale-95' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Image
                          fill
                          src={url}
                          alt={`${product.name} - ${idx + 1}`}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  {/* Product Title */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                        {product.name}
                      </h1>
                      
                      {/* Share Button */}
                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Share2 className="w-5 h-5 text-slate-600" />
                        </button>
                        
                        {showShareMenu && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm">Copy Link</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm">Share on Facebook</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm">Share on Twitter</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">(4.0) · 24 reviews</span>
                      <span className="text-sm text-slate-400">|</span>
                      <span className="text-sm text-emerald-600 font-medium">In Stock</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-slate-600 leading-relaxed">{product.description}</p>
                  </div>


                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {product.brand && (
                      <div>
                        <span className="text-sm text-slate-500 font-medium">Brand</span>
                        <p className="text-slate-900 font-semibold mt-1">{product.brand}</p>
                      </div>
                    )}
                    
                    {product.category && (
                      <div>
                        <span className="text-sm text-slate-500 font-medium">Category</span>
                        <p className="text-slate-900 font-semibold mt-1 capitalize">{product.category}</p>
                      </div>
                    )}
                    
                    {product.gender && product.gender.length > 0 && (
                      <div>
                        <span className="text-sm text-slate-500 font-medium">For</span>
                        <div className="flex gap-2 mt-1">
                          {product.gender.map(g => (
                            <Badge key={g} className="bg-purple-100 text-purple-700 border-0 capitalize">
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.material && (
                      <div>
                        <span className="text-sm text-slate-500 font-medium">Material</span>
                        <p className="text-slate-900 font-semibold mt-1">{product.material}</p>
                      </div>
                    )}
                  </div>


                  {/* Price Section */}
                  <div className="border-t border-b border-slate-200 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Price</p>
                        <p className="text-4xl font-bold text-slate-900">
                          ${product.price}
                          <span className="text-lg text-slate-500 font-normal ml-2">USD</span>
                        </p>
                      </div>
                      <StockStatusPill totalStock={product.stock} />
                    </div>
                  </div>


                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Quantity</label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200">
                          <button
                            onClick={() => setCartValue(prev => Math.max(1, prev - 1))}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xl transition-colors"
                          >
                            -
                          </button>
                          <span className="px-6 py-2 text-slate-900 font-semibold min-w-[60px] text-center">
                            {cartValue}
                          </span>
                          <button
                            onClick={() => setCartValue(prev => prev >= Math.min(product.stock, 10) ? prev : prev + 1)}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xl transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm text-slate-500">
                          {product.stock} available
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={addToCart}
                        disabled={product.stock === 0}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <button className="px-4 py-3.5 border-2 border-slate-300 hover:border-slate-400 rounded-lg transition-colors">
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                    <div className="text-center">
                      <TruckIcon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-medium">Free Shipping</p>
                    </div>
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-medium">30-Day Returns</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-medium">Secure Payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Product Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Size Options */}
                {product.sizeOptions && product.sizeOptions.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Size Options
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizeOptions.map(s => (
                        <Badge key={s} className="bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-colors">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                      Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map(f => (
                        <Badge key={f} className="bg-emerald-100 text-emerald-700 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Related Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(t => (
                      <Badge key={t} className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Related Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        )
      }


    </div >
  )
}


