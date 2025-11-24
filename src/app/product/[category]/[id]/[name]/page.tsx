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
import QuantityCounter from '@/components/ui/QuantityCounter'

export interface eachCartProduct {
  product: string;
  quantity: number;
}

export default function Page() {

  const cartProducts = useSelector((state: RootState) => state.cart.products)
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [cartValue, setCartValue] = useState(1)

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
    console.log('this is oldcart ', oldCart)

    if (oldCart) {
      const oldJson = JSON.parse(oldCart)
      // oldJson.length !== 0 && 
      if (oldJson.length !== 0) {
        const newCart = oldJson.map((eachProduct: eachCartProduct) => 
          eachProduct.product === id ?
            { ...eachProduct, quantity: 23 } :
            { product: id, quantity: cartValue }
            // todo this is giving me error while i add more than one items in cart
        )
        console.log('this is new Cart', newCart)
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
    <div>
      {
        product && (


          // bg-[#f9fafb] text-black 
          <div className=' pt-6 bg-[#f9fafb] text-black h-screen mx-auto  ' >

            {/* Images and Information */}
            <div
              className='flex justify-center  '
            >
              {/* Images */}
              <div
                className='flex basis-[45%] grow-0 shrink-0 flex-col h-[50vh]'
              >
                {/* Big Image */}
                <div
                  className='px-1    w-full h-[80%] '
                >
                  <div
                    className='relative  border  rounded-2xl  mx-auto w-full h-full  '
                  >
                    <Image
                      className='rounded-2xl object-contain'
                      alt="lamborghini"
                      fill
                      src={product.images[0]}
                    />
                  </div>
                </div>

                {/* Four small Images */}
                <div
                  className='  h-[19%] flex w-full  items-center justify-center'
                >
                  {
                    product.images.map(url => (

                      <div
                        className='relative mt-1 h-full  rounded-2xl border mx-1 w-[14%] '
                        key={url}
                      >
                        <Image
                          className='rounded-2xl'
                          fill
                          src={url}
                          alt="tech" />
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Product Information */}
              <div
                className='flex basis-[53%] flex-col pl-3 p-1'
              >
                {/* Heading */}
                <h1 className="text-3xl font-semibold text-[#11283d]">{product.name}</h1>


                <div>
                  {/* Description */}
                  <p className="text-[#6b7280] text-lg">{product.description}</p>
                </div>


                {/* Brand */}
                {
                  product.brand?.length !== 0 && (
                    <>
                      <div
                        className='mt-2 flex items-center'
                      >

                        <h1 className='text-xl mr-3 text-[#11283d] font-bold'>Brand:</h1>
                        <div>
                          <Badge className=' text-sm bg-[gainsboro] text-[#11283d] mr-2    '>{product.brand}</Badge>
                        </div>
                      </div>
                    </>
                  )
                }


                {/* Gender */}
                {
                  product.gender?.length !== 0 && (
                    <>
                      <div
                        className='mt-2 flex items-center'
                      >

                        <h1 className='text-xl text-[#11283d] mr-3 font-bold'>For:</h1>
                        <div>
                          {
                            product.gender?.map(g => (
                              <Badge className=' text-sm bg-[gainsboro] text-[#11283d] mr-2    ' key={g}>{g}</Badge>
                            ))
                          }
                        </div>
                      </div>
                    </>
                  )
                }


                {/* Material Use */}
                {
                  product.material?.length !== 0 && (
                    <>
                      <div
                        className='mt-2 flex items-center'
                      >

                        <h1 className='text-xl text-[#11283d] mr-3 font-bold'>Material Used:</h1>
                        <div>
                          <Badge className=' text-sm bg-[gainsboro] text-[#11283d] mr-2    '  >{product.material}</Badge>
                        </div>
                      </div>
                    </>
                  )
                }


                {/* Price and Stock Info */}
                <div className='flex justify-between w-[98%] mx-auto items-center mt-2'>
                  <p className='text-xl ml-1'>
                    PKR: &#8203;
                    <span className='text-2xl font-semibold'>
                      {product.price}
                    </span>
                  </p>
                  {/* Green for inStock and Red for outOfStock */}
                  <StockStatusPill className='mr-1' totalStock={product.stock} />
                </div>


                {/* Add to cart and counter */}
                <div className='flex  mx-auto justify-between mt-2  w-[98%] items-center'>
                  {/* counter */}
                  <div
                    className='flex justify-center   rounded-full items-cetner max-w-[20%] w-[20%]'
                  >
                    {/* Decrement Button */}
                    {/* <button onClick={() => setCartValue(prev => Math.max(1, prev - 1))} className=' w-full text-center rounded-l-full px-2 cursor-pointer border-r-[#3dbdf1]  p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300'>-</button> */}
                    {/* Cart Value */}
                    {/* <p className=' w-full text-center text-[#3dbdf1] px-1.5 p-1 font-bold text-lg  bg-gray-200'>{cartValue}</p> */}
                    {/* Increment Button */}
                    {/* <button onClick={() => setCartValue(prev => prev >= 5 ? prev : prev + 1)} className=' w-full text-center rounded-r-full px-2 cursor-pointer border-l-[#3dbdf1]  p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300'>+</button> */}
                    <QuantityCounter
                      currentProduct={product._id!}
                      setQty={setCartValue}
                      value={cartValue}
                    />
                  </div>

                  {/* button */}
                  <div
                    className='  w-[59%]'
                  >
                    <button onClick={addToCart} className="bg-[#27acdf] hover:bg-[#0d91c5] font-semibold   cursor-pointer text-white rounded-lg w-full  px-4 py-2  ">Add to cart</button>
                  </div>

                </div>

              </div>

            </div>

            {/* SEO Tags and Description */}
            <div className='w-[98%] px-2    mx-auto  '>
              <h1 className='text-3xl text-[#11283d] font-bold '>Other Information</h1>
              <div className='flex w-full justify-'>
                {/* Size Options  */}
                <div className='border-r-2 mb-9 border-[#27acdf] w-[50%]'>
                  {
                    product.sizeOptions?.length !== 0 && (
                      <>
                        <div
                          className='mt-2'
                        >
                          <h1 className='text-xl text-[#11283d] font-bold'>Size Options:</h1>
                          <div>
                            {
                              product.sizeOptions?.map(s => (
                                <Badge className='text-sm bg-[gainsboro] text-[#11283d] mr-2    ' key={s}>{s}</Badge>
                              ))
                            }
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>

                <div className=' w-[50%] pl-5 '>
                  {/* Features */}
                  {
                    product.features?.length !== 0 && (
                      <>
                        <div
                          className='mt-2'
                        >

                          <h1 className='text-xl text-[#11283d] font-bold'>Features:</h1>
                          <div>
                            {
                              product.features?.map(f => (

                                <Badge className=' text-sm bg-[gainsboro] text-[#11283d] mr-2    ' key={f}>{f}</Badge>
                              ))
                            }
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>

              {/* SEO Tags */}
              <div className=' '>
                <div>
                  <h1 className='text-xl text-[#11283d] font-bold'>Related Tags:</h1>
                  {
                    product.tags.map(t => (
                      <Badge className=' text-sm bg-[gainsboro] text-[#11283d] mr-1  ' key={t}>#{t}</Badge>
                    ))
                  }
                </div>
              </div>

            </div>


            <hr className='mt-5' />


            {/* Related Products Cards*/}
            <div>
              <h1 className='text-3xl text-[#11283d] font-bold px-4 mt-3 '>You might like </h1>
              <div
                className='flex items-center flex-wrap justify-center'
              >
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


