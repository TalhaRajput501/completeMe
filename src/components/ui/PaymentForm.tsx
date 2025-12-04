'use client'

import React, { useState } from 'react'
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js'
import { toast } from 'sonner'

function PaymentForm() {

  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      console.log('this is submit error', )
      setLoading(false)
      toast.error(submitError.message)
    }

    // const { error: confirmPaymentError } = await stripe.confirmPayment({
    const { error: confirmPaymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-success`
      }
    })

    if (confirmPaymentError.decline_code === 'card_declined') {
      toast.error(confirmPaymentError.message)
    }  
  



    setLoading(false)
  }


  return (
    <div className='w-full'>


      <form className='w-full flex flex-col items-center' onSubmit={handleSubmit} >

        <PaymentElement className='w-[70%]' />

        <button disabled={!stripe || loading} className='mx-auto mt-2  text-white p-3  disabled:bg-gray-400 disabled:cursor-progress  bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold ' type='submit'>Pay the Price </button>
      </form>
    </div>
  )
}

export default PaymentForm
