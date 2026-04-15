'use client'
import React, { useState } from 'react'
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js'
import { toast } from 'sonner' 

interface infoType {
  name: string;
  phone: number;
  address: string;
}

function PaymentForm(
  { orderId }: { orderId: string }
) {

  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<infoType>({
    name: '',
    phone: 0,
    address: ''
  })


  const stripe = useStripe()
  const elements = useElements()



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    // check if shipping details are missing
    if (!customerInfo.name) {
      setLoading(false)
      toast.error('Name is required')
      return
    }

    if (!customerInfo.phone) {
      setLoading(false)
      toast.error('Phone is required')
      return
    }

    if (!customerInfo.address) {
      setLoading(false)
      toast.error('Address is required')
      return
    }

    // if(!orderId){
    //   setLoading(false)
    //   toast.message('Something went wrong refresh the page')
    //   return
    // }


    // -----

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setLoading(false)
      toast.error(submitError.message)
      return
    }

    // now update the order and add shipping details
    try {

      const result = await fetch(`/api/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ customerInfo })
        }
      )

      const data = await result.json()
      console.log('data from order api ',data)
    } catch (error) {
      console.error('Error in updating ', error)
    }


    const { error: confirmPaymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-success`
      }
    })

    if (confirmPaymentError.decline_code === 'card_declined') {
      toast.error(confirmPaymentError.message)
      return
    }

    setLoading(false)
  }


  return (
    <div className='w-full mb-4'>


      <form className='w-full flex flex-col items-center' onSubmit={handleSubmit} >

        {/* Shipping  form  */}
        <div
          className='flex flex-col mb-4 w-[70%] mx-auto bg-white border p-2.5 rounded-sm'
        >
          <h1 className='text-[#3dbdf1] text-2xl font-bold '>Shipping Details</h1>

          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            id='name'
            placeholder='John Doe'
            type="text"
            autoComplete='name'
            className='rounded-sm border text-[#11283d] text-lg px-2 py-1 focus:border-[#3dbdf1] outline-none focus:shadow shadow-blue-600 '
          />

          {/* Phone */}
          <label htmlFor="phone">Phone</label>
          <input
            value={customerInfo.phone}
            type="number"
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: Number(e.target.value) }))}
            id='phone'
            placeholder='+1 (123) 456 7890'
            autoComplete='tel'
            className='rounded-sm border text-[#11283d] text-lg px-2 py-1 focus:border-[#3dbdf1] outline-none focus:shadow shadow-blue-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          />

          {/* Address */}
          <label htmlFor="address">Address</label>
          <input
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
            id='address'
            placeholder='123 country road America'
            type="text"
            autoComplete='street-address'
            className='rounded-sm border text-[#11283d] text-lg px-2 py-1 focus:border-[#3dbdf1] outline-none focus:shadow shadow-blue-600 '
          />

        </div>

        {/* Payment form */}
        <PaymentElement className='w-[70%] rounded-0 ' />

        <button
          disabled={!stripe || loading}
          className='mx-auto mt-2  text-white p-3  disabled:bg-gray-400 disabled:cursor-progress  bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold m ' type='submit'>
          Pay the Price
        </button> 
      </form>
    </div>
  )
}

export default PaymentForm
