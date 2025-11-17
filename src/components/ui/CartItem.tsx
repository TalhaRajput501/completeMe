import React from 'react'
import QuantityCounter from './QuantityCounter'

function CartItem() {
  return (
    <div className='flex   w-[70%] mt-3 mx-auto  '>
      <div className='flex w-full  border items-center justify-evenly  '>
        {/* Image */}
        <div>
          <img className='border w-55 h-32 rounded' src="https://media.istockphoto.com/id/1158547769/photo/car-driving-on-a-road.jpg?s=612x612&w=0&k=20&c=DWvTgClPT_kTsAkSJLIzVdThYuySNBN_aHpz8MMHITQ=" alt="" />
        </div>

        {/* Information */}
        <div className='flex flex-col ml-2'>
          <div>
            <h1 className='text-lg font-bold  text-[#11283d] ' >Product Name</h1>
            <p>Macbook</p>
          </div>

          <div>
            <h1 className='text-lg font-bold  text-[#11283d] ' >Unit Price: </h1>
            <p className='font-semibold'>444</p>
          </div>
        </div>

        {/* Counter */}
        <div className='flex flex-col'>
          <QuantityCounter deleteIcon className='  px-0 ' />
        </div>

        <div>
          <h1 className='text-lg font-semibold  text-[#11283d] ' >Total</h1>
          <p className='font-bold'>3434</p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
