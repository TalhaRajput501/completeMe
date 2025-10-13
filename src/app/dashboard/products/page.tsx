import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'


function page() {
  return (
    <div
      className=' h-screen mx-8'
    >

      <div>

        <h1
          className='pt-4 text-center text-4xl '
        >
          My Stock
        </h1>

        <div
          className='border-2 mt-4 flex  '
        >
          {/* Search Products Input  */}
          <div
            className='w-3/5 flex justify-center items-center'
          >
            <input
              className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl w-full rounded-l-full'
              placeholder="Search products..."
              type="text"
              autoFocus
            />

            <button
              className=' w- rounded-r-full   bg-white  pr-3 h-10 '
            >
              <SlidersHorizontal className=' p-1 px-2 rounded-full text-black hover:bg-gray-100 w-full h-full cursor-pointer' />
            </button>

          </div>

          {/* Buttons of add and others */}
          <div
            className='w-2/5'
          >
            <button
              className='border bg-green-400 p-2 px-4 mx-1 cursor-pointer'
            >Export  CSV</button>

            <Link href={'/dashboard/products/new'}>
              <button
                className='border bg-green-400 p-2 px-4 mx-1 cursor-pointer'
              >Add Product</button>
            </Link>

            <button
              className='border bg-green-400 p-2 px-4 mx-1 cursor-pointer'
            >Delete Selected</button>
          </div>
        </div>

        <div
          className='mt-3'
        >
          hello
        </div>

      </div>







    </div>

  )
}

export default page
