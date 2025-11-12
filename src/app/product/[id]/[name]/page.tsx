'use client'
import { singleProduct } from '@/app/dashboard/products/actions'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/schemas/product.schema'
import { Badge } from '@/components/ui/badge'
import LoadingIcon from '@/components/ui/LoadingIcon'

export default function Page() {


  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

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

  const show = () => {
    console.log(product)
  }

  if (loading || !product) {
    return <LoadingIcon />
  }

  return (
    <div>
      {
        product && (



          <div className='   bg-[#f9fafb] text-black h-screen mx-auto  ' >

            {/* Images and Information */}
            <div
              className='flex    '
            >
              {/* Images */}
              <div
                className='flex       border border-[#e5e7eb] basis-[42%] grow-0 shrink-0 flex-col'
              >
                {/* Big Image */}
                <div
                  className='px-1    w-full h-[65%] '
                >
                  <div
                    className='relative  border  rounded-2xl  mx-auto w-full h-full  '
                  >
                    <Image
                      className='rounded-2xl'
                      alt="lamborghini"
                      fill
                      src={product.images[0]}
                    />
                  </div>
                </div>

                {/* Four small Images */}
                <div
                  className='  h-[33%] flex w-full  '
                >
                  {
                    product.images.map(url => (

                      <div
                        className='relative mt-1 h-full  rounded-2xl border mx-1 w-[24%] '
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
                className='flex border basis-[57%] flex-col pl-3 p-1'
              >
                {/* Heading */}
                <h1 className="text-2xl font-semibold text-balck">{product.name}</h1>


                <div>
                  {/* Description */}
                  <p className="text-[#6b7280]">{product.description}</p>
                </div>


                {/* Features */}
                {
                  product.features?.length !== 0 && (
                    <>
                      <div
                        className='mt-2'
                      >

                        <h1 className='text-lg font-bold'>Features:</h1>
                        <div>
                          {
                            product.features?.map(f => (

                              <Badge className='bg-[#c5bdbdc7] text-black' key={f}>{f}</Badge>
                            ))
                          }
                        </div>
                      </div>
                    </>
                  )
                }


                {/* Price and Stock Info */}
                <div className='flex justify-between w-[95%] mx-auto items-center mt-2'>
                  <Badge className={` w-fit ${product.isActive ? 'bg-[rgb(1,71,55)] text-[rgb(132,225,188)] ' : 'bg-[rgb(119,29,29)] text-[rgb(248,180,180)] '} `}>{product.isActive ? 'In Stock' : 'Out of stock'}</Badge>
                  <p>
                    PKR:
                    <span className='font-semibold'>
                      {product.price}
                    </span>
                  </p>
                </div>


                {/* Add to cart and counter */}
                <div className='flex  mx-auto justify-between mt-2 w-[95%] items-center'>
                  <div
                    className='flex justify-center items-cetner       '
                  >
                    <button className='rounded-l-full px-2 cursor-pointer border-r-gray-400 p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 transition-colors duration-300'>-</button>
                    <p className=' px-1.5 p-1 font-bold text-lg  bg-gray-200'>1</p>
                    <button className='rounded-r-full px-2 cursor-pointer border-l-gray-400 p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 transition-colors duration-300'>+</button>
                  </div>
                  <div>
                    <button onClick={show} className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg px-4 py-2 mt-3">Add to cart</button>
                  </div>
                </div>


              </div>


            </div>

            {/* SEO Tags and Description */}
            <div>


              {/* Gender */}
              {
                product.gender?.length !== 0 && (
                  <>
                    <div
                      className='mt-2'
                    >

                      <h1 className='text-lg font-bold'>Gender:</h1>
                      <div>
                        {
                          product.gender?.map(g => (
                            <Badge className='bg-[#c5bdbdc7] text-black' key={g}>{g}</Badge>
                          ))
                        }
                      </div>
                    </div>
                  </>
                )
              }


              {/* Size Options  */}
              {
                product.sizeOptions?.length !== 0 && (
                  <>
                    <div
                      className='mt-2'
                    >
                      <h1 className='text-lg font-bold'>Size Options:</h1>
                      <div>
                        {
                          product.sizeOptions?.map(s => (
                            <Badge className='bg-[#c5bdbdc7] text-black' key={s}>{s}</Badge>
                          ))
                        }
                      </div>
                    </div>
                  </>
                )
              }


              <div>
                {
                  product.tags.map(t => (
                    <Badge className='bg-[#c5bdbdc7] text-black' key={t}>#{t}</Badge>
                  ))
                }
              </div>
            </div>


            <hr />


            {/* Related Products Cards*/}
            <div
              className='flex'
            >
              <h1></h1>
              <div></div>
            </div>

          </div>
        )
      }


    </div >
  )
}


