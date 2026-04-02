'use client'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import { CheckCircle, Package, Home, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function OrderSuccessPage() {
  // Sample order data - Replace with actual data from URL params or API
  const orderDetails = {
    orderId: '1234567890',
    orderNumber: 'ORD-2026-001',
    email: 'customer@example.com',
    estimatedDelivery: '3-5 business days',
    items: 2,
    total: 299.99
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Progress bar */}
      <div className='w-full pt-8 pb-4 bg-white shadow-sm'>
        <div className='max-w-4xl mx-auto px-4'>
          <CheckoutProgress firstDone secondDone thirdDone />
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 py-8 md:py-12'>
        
        {/* Success Card */}
        <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6'>
          {/* Success Header with Icon */}
          <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-8 md:p-12 text-center'>
            <div className='w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce'>
              <CheckCircle className='w-12 h-12 md:w-14 md:h-14 text-white' strokeWidth={2.5} />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-800 mb-3'>
              Order Placed Successfully!
            </h1>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Thank you for your purchase. We've received your order and will send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className='p-6 md:p-8'>
            <div className='mb-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-4 flex items-center gap-2'>
                <Package className='w-5 h-5 text-blue-600' />
                Order Details
              </h2>
              <div className='bg-slate-50 rounded-lg p-5 border border-slate-200'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-slate-600 mb-1'>Order Number</p>
                    <p className='font-semibold text-slate-800 text-lg'>{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className='text-sm text-slate-600 mb-1'>Order ID</p>
                    <p className='font-mono text-slate-700 text-sm'>{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className='text-sm text-slate-600 mb-1'>Total Items</p>
                    <p className='font-semibold text-slate-800'>{orderDetails.items} items</p>
                  </div>
                  <div>
                    <p className='text-sm text-slate-600 mb-1'>Total Amount</p>
                    <p className='font-bold text-slate-800 text-lg'>${orderDetails.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className='mb-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-4'>What's Next?</h2>
              <div className='space-y-3'>
                <div className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold'>
                    1
                  </div>
                  <div>
                    <p className='font-semibold text-slate-800 mb-1'>Order Confirmation</p>
                    <p className='text-sm text-slate-600'>You'll receive an email confirmation at <span className='font-medium'>{orderDetails.email}</span></p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold'>
                    2
                  </div>
                  <div>
                    <p className='font-semibold text-slate-800 mb-1'>Order Processing</p>
                    <p className='text-sm text-slate-600'>We're preparing your items for shipment</p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold'>
                    3
                  </div>
                  <div>
                    <p className='font-semibold text-slate-800 mb-1'>Shipping & Delivery</p>
                    <p className='text-sm text-slate-600'>Estimated delivery: <span className='font-medium'>{orderDetails.estimatedDelivery}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className='bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-5 border border-slate-200'>
              <h3 className='font-semibold text-slate-800 mb-3'>Need Help?</h3>
              <div className='space-y-2 text-sm text-slate-600'>
                <div className='flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-blue-600' />
                  <span>support@yourstore.com</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-blue-600' />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid sm:grid-cols-2 gap-4'>
          <Link href='/' className='block'>
            <button className='w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg py-4 px-6 font-semibold transition-all shadow-sm hover:shadow'>
              <Home className='w-5 h-5' />
              Continue Shopping
            </button>
          </Link>

          <Link href='/dashboard/orders' className='block'>
            <button className='w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-4 px-6 font-semibold transition-all shadow-md hover:shadow-lg'>
              View Order Details
              <ArrowRight className='w-5 h-5' />
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-slate-600'>
            Questions about your order? Visit our{' '}
            <Link href='/help' className='text-blue-600 hover:text-blue-700 font-medium underline'>
              Help Center
            </Link>
            {' '}or contact support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
