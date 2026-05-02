'use client'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import type { OrderType } from '@/models/orders.model'
import {
  CheckCircle,
  Package,
  Home,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Hash,
  Wallet,
  ReceiptText,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type LocalOrderDetails = {
  _id?: OrderType['_id']
  products?: OrderType['products']
  customerInfo?: OrderType['customerInfo']
  paymentIntentId?: OrderType['paymentIntentId']
  status?: OrderType['status']
  totalAmount?: OrderType['totalAmount']
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)

function OrderSuccessPage() {
  const [order, setOrder] = useState<LocalOrderDetails | null>(null)
  const [isReady, setIsReady] = useState(false)

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(paymentIntentId)
    toast.success('Payment Intent ID copied to clipboard')
  }

  useEffect(() => {
    try {
      const details = localStorage.getItem('orderDetails')
      if (!details) {
        return
      }

      const parsed = JSON.parse(details) as LocalOrderDetails
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        setOrder(parsed)
      }
    } catch (error) {
      console.error('Unable to parse order details from localStorage', error)
    } finally {
      setIsReady(true)
    }
  }, [])

  const personalizedUI = Boolean(order)
  const orderProducts = Array.isArray(order?.products) ? order.products : []
  const subtotal = orderProducts.reduce((sum, product) => {
    const unitPrice = Number(product?.price ?? 0)
    const quantity = Number(product?.orderedQuantity ?? 0)
    return sum + unitPrice * quantity
  }, 0)

  const totalAmount = Number(order?.totalAmount ?? subtotal)
  const orderId = order?._id ? String(order._id) : 'Not available'
  const paymentIntentId = order?.paymentIntentId ? String(order.paymentIntentId) : 'Not available'
  const orderStatus = order?.status ? String(order.status) : 'pending'
  const customerEmail = order?.customerInfo?.email || 'your email'
  const customerName = order?.customerInfo?.name || 'Not provided'
  const customerPhone = order?.customerInfo?.phone ? String(order.customerInfo.phone) : 'Not provided'
  const customerAddress = order?.customerInfo?.address || 'Not provided'

  if (!isReady) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8'>
          {/* <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'> */}
            <div className='w-full px-2'>
              <CheckoutProgress firstDone secondDone thirdDone />
            </div>
          {/* </section> */}
        </div>
      </div>
    )
  }
  

  return (
    <>
      {personalizedUI ? 
      (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8'>
            {/* <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'> */}
              <div className='w-full px-2'>
                <CheckoutProgress firstDone secondDone thirdDone />
              </div>
            {/* </section> */}

            <div className='mx-auto max-w-5xl pt-8 md:pt-12'>
              <div className='mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'>
                <div className='border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center md:p-12'>
                  <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg md:h-24 md:w-24'>
                    <CheckCircle className='h-12 w-12 text-white md:h-14 md:w-14' strokeWidth={2.5} />
                  </div>
                  <h1 className='mb-3 text-3xl font-bold text-slate-800 md:text-4xl'>Order Placed Successfully!</h1>
                  <p className='mx-auto max-w-2xl text-lg text-slate-600'>
                    Thank you for your purchase. Your payment is confirmed and order details are ready below.
                  </p>
                </div>

                <div className='space-y-6 p-6 md:p-8'>
                  <div>
                    <h2 className='mb-4 flex items-center gap-2 text-xl font-bold text-slate-800'>
                      <Package className='h-5 w-5 text-blue-600' />
                      Order Information
                    </h2>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                        <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Order ID</p>
                        <p className='break-all font-mono text-sm text-slate-800'>{orderId}</p>
                      </div>
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                        <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Payment Intent ID</p>
                        <p className='break-all font-mono text-sm text-slate-800'>{paymentIntentId}</p>
                      </div>
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                        <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Status</p>
                        <span className='inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700'>
                          {orderStatus}
                        </span>
                      </div>
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                        <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Items</p>
                        <p className='text-sm font-semibold text-slate-800'>{orderProducts.length} items</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className='mb-4 flex items-center gap-2 text-xl font-bold text-slate-800'>
                      <MapPin className='h-5 w-5 text-blue-600' />
                      Shipping Details
                    </h2>
                    <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                      <div className='grid gap-3 sm:grid-cols-2'>
                        <div>
                          <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Name</p>
                          <p className='text-sm text-slate-700'>{customerName}</p>
                        </div> 
                        <div>
                          <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Email</p>
                          <p className='text-sm text-slate-700'>{customerEmail}</p>
                        </div>
                        <div>
                          <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Phone</p>
                          <p className='text-sm text-slate-700'>{customerPhone}</p>
                        </div>
                        <div>
                          <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500'>Address</p>
                          <p className='text-sm text-slate-700'>{customerAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className='mb-4 flex items-center gap-2 text-xl font-bold text-slate-800'>
                      <ReceiptText className='h-5 w-5 text-blue-600' />
                      Itemized Bill
                    </h2>

                    <div className='overflow-hidden rounded-lg border border-slate-200'>
                      <div className='grid grid-cols-12 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500'>
                        <p className='col-span-5'>Product ID</p>
                        <p className='col-span-2 text-center'>Qty</p>
                        <p className='col-span-2 text-right'>Unit</p>
                        <p className='col-span-3 text-right'>Line Total</p>
                      </div>

                      <div className='divide-y divide-slate-200'>
                        {orderProducts.length > 0 ? (
                          orderProducts.map((product, index) => {
                            const productId = product?.productId ? String(product.productId) : `item-${index + 1}`
                            const unitPrice = Number(product?.price ?? 0)
                            const quantity = Number(product?.orderedQuantity ?? 0)
                            const lineTotal = unitPrice * quantity

                            return (
                              <div key={`${productId}-${index}`} className='grid grid-cols-12 items-center px-4 py-3 text-sm'>
                                <p className='col-span-5 break-all font-mono text-slate-700'>{productId}</p>
                                <p className='col-span-2 text-center text-slate-700'>{quantity}</p>
                                <p className='col-span-2 text-right text-slate-700'>{formatCurrency(unitPrice)}</p>
                                <p className='col-span-3 text-right font-semibold text-slate-800'>{formatCurrency(lineTotal)}</p>
                              </div>
                            )
                          })
                        ) : (
                          <p className='px-4 py-4 text-sm text-slate-600'>No products found for this order.</p>
                        )}
                      </div>

                      <div className='flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3'>
                        <p className='flex items-center gap-2 text-sm font-semibold text-slate-700'>
                          <Wallet className='h-4 w-4 text-blue-600' />
                          Total Bill
                        </p>
                        <p className='text-lg font-bold text-slate-800'>{formatCurrency(totalAmount)}</p>
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border border-blue-200 bg-blue-50 p-4 relative'>
                    <p className='flex items-center gap-2 text-sm font-semibold text-blue-800'>
                      <Hash className='h-4 w-4' />
                      Want to track your order?
                    </p>
                    <p className='mt-1 text-sm text-blue-700'>
                      On the tracking page, use your Payment Intent ID below to locate your order status.
                    </p>
                    <p className='mt-2 break-all rounded-md border border-blue-200 bg-white px-3 py-2 font-mono text-xs text-slate-700'>
                      {paymentIntentId}
                    </p>
                    <button className='absolute right-2 top-2 rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer transition-all' onClick={copyToClipBoard}>
                      Copy
                    </button>
                  </div>

                  <div className='rounded-lg border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-5'>
                    <h3 className='mb-3 font-semibold text-slate-800'>Need Help?</h3>
                    <div className='space-y-2 text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 text-blue-600' />
                        <span>muhammadtalha.dev4197@gmail.com</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4 text-blue-600' />
                        <span>+92 (319) 174-8730</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <Link href='/' className='block'>
                  <button className='w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow'>
                    <span className='flex items-center justify-center gap-2'>
                      <Home className='h-5 w-5' />
                      Continue Shopping
                    </span>
                  </button>
                </Link>

                <Link href={`/order-tracking${paymentIntentId !== 'Not available' ? `?paymentIntentId=${encodeURIComponent(paymentIntentId)}` : ''}`} className='block'>
                  <button className='group w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg'>
                    <span className='flex items-center justify-center gap-2'>
                      View Order Details
                      <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8'>
            {/* <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'> */}
              <div className='w-full px-2'>
                <CheckoutProgress firstDone secondDone thirdDone />
              </div>
            {/* </section> */}

            <div className='mx-auto max-w-4xl pt-8 md:pt-12'>
              <div className='mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'>
                <div className='border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center md:p-12'>
                  <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg md:h-24 md:w-24'>
                    <CheckCircle className='h-12 w-12 text-white md:h-14 md:w-14' strokeWidth={2.5} />
                  </div>
                  <h1 className='mb-3 text-3xl font-bold text-slate-800 md:text-4xl'>Order Placed Successfully!</h1>
                  <p className='mx-auto max-w-2xl text-lg text-slate-600'>
                    Thank you for your purchase. We&apos;ve received your order and will send you a confirmation email shortly.
                  </p>
                </div>

                <div className='p-6 md:p-8'>
                  <div className='mb-6'>
                    <h2 className='mb-4 text-xl font-bold text-slate-800'>What&apos;s Next?</h2>
                    <div className='space-y-3'>
                      <div className='flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4'>
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white'>
                          1
                        </div>
                        <div>
                          <p className='mb-1 font-semibold text-slate-800'>Order Confirmation</p>
                          <p className='text-sm text-slate-600'>
                            You&apos;ll receive an email confirmation at <span className='font-medium'>{customerEmail}</span>
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4'>
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white'>
                          2
                        </div>
                        <div>
                          <p className='mb-1 font-semibold text-slate-800'>Order Processing</p>
                          <p className='text-sm text-slate-600'>We&apos;re preparing your items for shipment</p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4'>
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white'>
                          3
                        </div>
                        <div>
                          <p className='mb-1 font-semibold text-slate-800'>Shipping & Delivery</p>
                          <p className='text-sm text-slate-600'>Estimated delivery: <span className='font-medium'>3-5 business days</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-5'>
                    <h3 className='mb-3 font-semibold text-slate-800'>Need Help?</h3>
                    <div className='space-y-2 text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 text-blue-600' />
                        <span>muhammadtalha.dev4197@gmail.com</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4 text-blue-600' />
                        <span>+92 (319) 174-8730</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <Link href='/' className='block'>
                  <button className='w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow'>
                    <span className='flex items-center justify-center gap-2'>
                      <Home className='h-5 w-5' />
                      Continue Shopping
                    </span>
                  </button>
                </Link>

                <Link href='/order-tracking' className='block'>
                  <button className='group w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg'>
                    <span className='flex items-center justify-center gap-2'>
                      View Order Details
                      <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderSuccessPage
