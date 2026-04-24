'use client'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import React, { useEffect, useRef, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '@/components/ui/PaymentForm'
import OrderSummary from '@/components/ui/OrderSummary'
import { useAppSelector } from '@/lib/store/reduxHooks'
import { postRequest } from '@/utils/postRequest'
import { toast } from 'sonner'

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
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    // Guard to prevent multiple calls
    if (hasCalledAPI.current) return;
    if (!products.length) return;

    hasCalledAPI.current = true;

    const createPaymentIntent = async () => {
      try {
        const res = await postRequest<{ products: { _id: string; qtyToBuy: number; }[] }, { clientSecret: string, orderId: string }>(
          {
            url: '/api/payment-intent',
            data: { products: products.map(({ _id, qtyToBuy }) => ({ _id, qtyToBuy })) }
          })

        if (!res) {
          throw new Error('No response from server')
        }
        // console.log('response from', res)
        if(!res.data) throw new Error(res.message || 'Failed to create payment intent')
        setClientSecret(res.data.clientSecret)
        setOrderId(res.data.orderId)
      } catch (error) {
        console.error('Payment intent failed:', error)
        toast.error(error instanceof Error ? error.message : 'Failed to create payment intent')
      }
    }
    createPaymentIntent()
  }, [products])



  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8'>
        {/* Checkout Progress Bar*/}
        {/* <section className='rounded-2xl border border-slate-200 shadow-sm bg-white p-4 sm:p-5'> */}
        <div className='w-full px-2'>
          <CheckoutProgress secondPage firstDone />
        </div>
        {/* </section> */}

        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Payment Form */}
          <section className='lg:col-span-8 xl:col-span-9'>
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                }}
              >
                <PaymentForm orderId={orderId} />
              </Elements>
            ) : (
              <div className='rounded-2xl border border-slate-200 bg-white p-10 shadow-sm'>
                <div role='status' className='flex w-full items-center justify-center'>
                  <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-b-transparent' aria-hidden='true'></div>
                </div>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className='lg:col-span-4 xl:col-span-3'>
            <OrderSummary />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Page
