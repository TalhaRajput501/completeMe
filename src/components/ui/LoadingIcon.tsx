import React from 'react'
import Image from 'next/image'
import loader from '@/assets/loader.gif'

function LoadingIcon() {
  return (
    <div
      className='w-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center rounded-lg bg-transparent'
    >

      <Image
        src={loader}
        alt='Loading...'
        className='w-20 h-20 sm:w-24 sm:h-24'
        priority
      />

    </div>
  )
}

export default LoadingIcon
