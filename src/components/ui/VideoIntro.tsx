import React from 'react'
import Heading from './Heading'
import Button from './Button'

function VideoIntro() {
  return (
    <div className='flex flex-col md:flex-row items-center gap-8'>

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
        <Heading extraClassName="text-slate-800 md:ml-12 md:text-5xl text-center md:text-left">
          Define Your Style
        </Heading>
        <p className='text-md font-bold mt-4 md:ml-12 text-slate-800 text-center md:text-left'>
          Watches that mark your moments. Shoes that ground your presence. Clothing that fits your confidence. Complete your personality, one detail at a time.
        </p>
        <div className='flex justify-center md:justify-start md:items-end mt-6 md:ml-12'>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer "
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