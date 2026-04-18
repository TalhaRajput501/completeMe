import React from 'react'

function VideoIntro() {
  return (
    <div className='border border-red-500 flex'>
      <div className=''>

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
      </div>

      <div className='border border-red-500 w-full  flex flex-col justify-center'>
        <h1 className='text-2xl font-bold mt-4 ml-12'>Welcome to Our Website</h1>
        <p className='text-2xl font-bold mt-4 ml-12'>Welcome to Our Website</p>
      </div>
    </div>
  )
}

export default VideoIntro 