import React from 'react'
import Image from 'next/image'
import loader from '@/assets/loader.gif'

function LoadingIcon() {
  return (
    <div
      className=' h-screen  bg-[rgba(10,12,15,0.8)]  z-55 top-16 fixed  left-0 right-0 flex items-center justify-center'
    >

      <Image
        src={loader}
        alt='Loading...'
        className='w-22'
      />

    </div>
  )
}

export default LoadingIcon
