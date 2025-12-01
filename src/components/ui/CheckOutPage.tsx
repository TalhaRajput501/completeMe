'use client'

import React, { useEffect, useState } from 'react'
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js'

function CheckOutPage() {

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
      console.log('this is submit error', submitError)
      setLoading(false)
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-success`
      }
    })

    setLoading(false)
  }


  return (
    <div className='w-full'>
      <form className='w-full' onSubmit={handleSubmit} >

        <PaymentElement className='w-full' />

        <button disabled={!stripe || loading} className='mx-auto mt-2 bg-black text-white p-3 cursor-pointer disabled:cursor-e-resize' type='submit'>Pay the Price </button>
      </form>
    </div>
  )
}

export default CheckOutPage
