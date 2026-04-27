'use client'
import React, { useState } from 'react'
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js'
import { toast } from 'sonner'
import { OrderStatus, OrderType } from '@/models/orders.model';
import { ApiResponse } from '../../../types/ApiResponse';
import { useRouter } from 'next/navigation';
import { sendThankYouMail } from '@/lib/actions/email.actions';

interface infoType {
  name: string;
  phone: string;
  address: string;
  email: string;
}



function PaymentForm(
  { orderId }: { orderId: string }
) {

  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<infoType>({
    name: '',
    phone: '',
    address: '',
    email: '',
  })


  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    // check if shipping details are missing
    if (!customerInfo.name.trim()) {
      setLoading(false)
      toast.error('Name is required')
      return
    }

    if (!customerInfo.phone.trim()) {
      setLoading(false)
      toast.error('Phone is required')
      return
    }

    if (!customerInfo.address.trim()) {
      setLoading(false)
      toast.error('Address is required')
      return
    }

    if (!customerInfo.email.trim()) {
      setLoading(false)
      toast.error('Email is required')
      return
    }

    if (!orderId) {
      setLoading(false)
      toast.message('Something went wrong refresh the page')
      return
    }

    // -----

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setLoading(false)
      toast.error(submitError.message)
      return
    }

    const { error: confirmPaymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: `${process.env.NEXT_PUBLIC_URL}/order-success`,
        receipt_email: customerInfo.email,
      },
      redirect: 'if_required',  // This will prevent automatic redirection and allow us to handle the flow manually
    })

    // Step 1 if error exist don't update order
    if (confirmPaymentError) {
      setLoading(false)
      if (confirmPaymentError.decline_code === 'card_declined') {
        toast.error(confirmPaymentError.message)
        return
      }
    }

    // Step 2 update the order and add shipping details
    try {
      const status: OrderStatus = 'pending'

      const result = await fetch(`/api/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ customerInfo, status })
        }
      )

      const data: ApiResponse<OrderType> = await result.json()

      // Step 3 if order update failed show error and refund the payment on backend
      if (!data.success) {
        // Attempt to refund the payment

        throw new Error(data.message || 'Failed to update order after payment')
      }

      // Step 4 if order is updated and payement is successful remove cart from local storage and save order details to show in order success page
      if (data.data) {
        localStorage.removeItem('cartProducts')
        localStorage.removeItem('orderDetails')
        localStorage.setItem('orderDetails', JSON.stringify(data.data))
      }

      // Step 5 show success message & Send thank you email to customer and redirect to order success page
      toast.success(data.message || 'Payment successful, order placed!')

      // Sending Email
      try {
        const data = await sendThankYouMail()
        console.log("Thank you mail sent successfully: ", data)
        if (data.error) {
          console.error("Failed to send thank you email.")
        } else {
          toast.success("Order confirmation email sent successfully!")
        }
      } catch (error) {
        console.error("Failed to send thank you email.")
      }

      router.push('/order-success')

    } catch (error) {

      console.error('Error in updating ', error)
      toast.error(error instanceof Error ? error.message : 'Payment successful but failed to place order')
    }

    setLoading(false)
  }


  return (
    <div className='w-full mb-4'>
      <form className='w-full space-y-5' onSubmit={handleSubmit}>
        {/* Shipping form */}
        <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
          <h1 className='text-2xl font-bold text-slate-800'>Shipping Details</h1>
          <p className='mt-1 text-sm text-slate-600'>Enter delivery information for your order.</p>

          <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <label htmlFor='name' className='mb-1 block text-sm font-semibold text-slate-700'>
                Name
              </label>
              <input
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                id='name'
                placeholder='John Doe'
                type='text'
                autoComplete='name'
                className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div className='sm:col-span-1'>
              <label htmlFor='phone' className='mb-1 block text-sm font-semibold text-slate-700'>
                Phone
              </label>
              <input
                value={customerInfo.phone}
                type='tel'
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                id='phone'
                placeholder='+1 (123) 456 7890'
                autoComplete='tel'
                className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div className='sm:col-span-1'>
              <label htmlFor='address' className='mb-1 block text-sm font-semibold text-slate-700'>
                Address
              </label>
              <input
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                id='address'
                placeholder='123 Country Road, New York, USA'
                type='text'
                autoComplete='street-address'
                className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div className='sm:col-span-1'>
              <label htmlFor='email' className='mb-1 block text-sm font-semibold text-slate-700'>
                Email
              </label>
              <input
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                id='email'
                placeholder='john.doe@example.com'
                type='email'
                autoComplete='email'
                className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
          <h2 className='text-xl font-bold text-slate-800'>Payment Details</h2>
          <p className='mt-1 text-sm text-slate-600'>Secure payment powered by Stripe.</p>
          <div className='mt-4'>
            <PaymentElement />
          </div>
        </div>

        <button
          disabled={!stripe || loading}
          className='w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-progress disabled:bg-gray-400 sm:w-auto cursor-pointer'
          type='submit'
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
