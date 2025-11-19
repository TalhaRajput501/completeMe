import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div
      className='bg-gray-900 text-white h-screen'
    >
      <h1 className='text-2xl' >Here will be all the product like this will show you your cart</h1>
      <Link className='border p-4' href={'/cart'} >Go to cart</Link>
    </div>
  )
}

export default page
