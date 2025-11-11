'use client'
import { singleProduct } from '@/app/dashboard/products/actions'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/schemas/product.schema'
import { Badge } from '@/components/ui/badge'

function page() {


  const [product, setProduct] = useState<ProductType | null>(null)


  const params = useParams()
  const { id, name } = params
  if (!id) {
    return (
      <div>not found</div>
    )
  }
  useEffect(() => {
    const getProduct = async () => {
      const stringId = id as string
      const product = await singleProduct(stringId)
      setProduct(product)
      console.log('object')
      console.log('this is the product and yes ', product)
    }
    getProduct()
  }, [])
  return (
    <div className='bg-gray-900 h-screen mx-auto text-white' >

      {/* Images and Information */}
      <div
        className='flex '
      >
        {/* Images */}
        <div
          className='flex border  basis-[42%] grow-0 shrink-0 flex-col'
        >
          {/* Big Image */}
          <div
            className='px-1    w-full h-full '
          >
            <div
              className='relative  border  rounded-2xl  mx-auto w-full h-full  '
            >
              <Image fill src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/model_details/huracan/sterrato/menu-huracansterrato.png" alt="lamborghini" />
            </div>
          </div>

          {/* Four small Images */}
          <div
            className='   flex w-full h-full  '
          >
            {
              [1, 2, 3, 4].map(url => (

                <div
                  className='relative mt-1  rounded-2xl border mx-1 w-[24%] h-[33%]'
                  key={url}
                >
                  <Image 
                    fill
                    src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/model_details/huracan/sterrato/menu-huracansterrato.png"
                    alt="lamborghini" />
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
          <h1>{product?.name}4</h1>

          {/* Description */}
          <p>{product?.description}</p>

          {/* Features */}
          {
            product?.features?.length !== 0 && (
              <>
                <h1>Features</h1>
                <div>
                  <Badge>water resistent</Badge>
                </div>
              </>
            )
          }

          {/* Size Options  */}
          {
            product?.sizeOptions?.length !== 0 && (
              <>
                <h1>Size Options</h1>
                <div>
                  <Badge>talha</Badge>
                </div>
              </>
            )
          }

          {/* Price and Stock Info */}
          <div className='flex'>
            <p>price</p>
            <Badge>in sotck</Badge>
          </div>


          {/* Add to cart and counter */}
          <div className='flex'>
            <div>counter</div>
            <div>
              <button>Add to cart</button>
            </div>
          </div>


        </div>


      </div>

      {/* SEO Tags */}
      <div></div>


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

export default page
