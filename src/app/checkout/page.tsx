'use client'
import CheckoutProgress from '@/components/ui/CheckoutProgress' 
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '@/components/ui/PaymentForm'
import OrderSummary from '@/components/ui/OrderSummary'
import { useAppSelector } from '@/lib/store/reduxHooks'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


function Page() {

  // const amount = 555 * 100

  // fetch redux cart here and it should include quantity to  buy
  // to create total in backend  
  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const products = useAppSelector(state => state.cart.products)

  useEffect(() => {
    fetch('/api/payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products: products.map(({ _id, qtyToBuy }) => ({ _id, qtyToBuy })) })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)
        setOrderId(data.orderId)
      })
      .finally(() => console.log('client secret: ', clientSecret))

  }, [products])



  return (
    <div
      className='   '
    >
      <div className='flex w-full'>

        {/* Payment Form and Progress Bar */}
        <div
          className='w-[70%]  mx-auto    flex-col'
        >

          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress secondPage firstDone />
          </div>

          {/* Stripe payment form */}
          {
            clientSecret ? (
              <div className='w-full mt-5'>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                  }}
                >
                  <PaymentForm orderId={orderId} />
                </Elements>

              </div>
            ) : (
              // Loader spinner while payment form load
              <div role="status" className="w-full items-cneter justify-center mt-9 flex  items-center">
                <div className="w-8 h-8 border-4 border-[#3dbdf1] rounded-full animate-spin border-b-transparent" aria-hidden="true"></div>
              </div>
            )
          }


        </div>


        {/* Order Summary */}
        <div className=' border-0 border-l-1 w-[30%] h-[calc(100vh-4rem)]'>
          <OrderSummary />
        </div>

      </div>
    </div>
  )
}

export default Page
