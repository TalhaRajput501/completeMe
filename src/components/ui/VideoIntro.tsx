import React from 'react'
import Heading from './Heading'
import Button from './Button'

function VideoIntro() {
  return (
    <div className='flex  '>

      <video
        width='324'
        height="540"
        autoPlay
        muted
        loop
        // controls
        preload="none"
        className='rounded-md '
      >
        <source src="/video.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>

      <div className='w-full flex flex-col justify-center'>
        <Heading extraClassName="text-slate-800 md:ml-12 md:text-5xl">Welcome to Our Website</Heading>
        <p className='text-md font-bold mt-4 ml-12 text-slate-800'>Welcome to Our Website. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis qui consectetur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi doloremque itaque animi.</p>
        <div className='flex justify-end items-end mt-6 ml-12'>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer mr-[40%]"
            onClick={() => alert("This feature is coming soon!")}
          >
            Shop Now
          </Button>
        </div>
      </div>

    </div>
  )
}

export default VideoIntro 