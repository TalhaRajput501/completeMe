import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      <h1
        className='bg-blue-500 text-center mt-4 text-4xl '
      >
        Quick actions
      </h1>

    <Link
      href={'/dashboard/products/new'}
      className='bg-green-400 px-4 py-1 rounded text-xl mt-14'
    >
      Add new Product
    </Link>


    </div>
  )
}

export default page
