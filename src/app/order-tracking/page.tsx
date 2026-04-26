'use client'

import { getOrderByPaymentIntent, type OrderTrackingView } from '@/lib/actions/orders.actions'
import { Package, Search, Clock, CheckCircle2, XCircle, Loader2, Receipt, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const statusStyles: Record<OrderTrackingView['status'], string> = {
  draft: 'bg-slate-100 text-slate-700',
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const [paymentIntent, setPaymentIntent] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<OrderTrackingView | null>(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const fromQuery = searchParams.get('paymentIntentId')
    if (fromQuery) {
      setPaymentIntent(fromQuery)
    }
  }, [searchParams])

  const handleTrackOrder = async () => {
    if (!paymentIntent.trim()) {
      toast.error('Enter a valid payment intent ID')
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const result = await getOrderByPaymentIntent(paymentIntent)
      setOrder(result)
      if (!result) {
        toast.error('No order found for this payment intent ID')
      }
    } catch (error) {
      console.error('Order tracking failed', error)
      toast.error('Unable to track order right now')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto w-full max-w-4xl'>
        <Link href='/' className='mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800'>
          <ArrowLeft className='h-4 w-4' />
          Back to home
        </Link>

        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
          <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>Track Your Order</h1>
          <p className='mt-2 text-sm text-slate-600'>
            Enter your payment intent ID to check latest order status.
          </p>

          <div className='mt-5 flex flex-col gap-3 sm:flex-row'>
            <div className='relative flex-1'>
              <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                value={paymentIntent}
                onChange={(e) => setPaymentIntent(e.target.value)}
                placeholder='pi_...'
                className='w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              />
            </div>
            <button
              type='button'
              onClick={handleTrackOrder}
              disabled={loading}
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400'
            >
              {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Search className='h-4 w-4' />}
              Track Order
            </button>
          </div>
        </div>

        {searched && !loading && !order && (
          <div className='mt-5 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm'>
            <XCircle className='mx-auto h-10 w-10 text-red-500' />
            <h2 className='mt-3 text-lg font-semibold text-slate-800'>Order not found</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Please verify your payment intent ID and try again.
            </p>
          </div>
        )}

        {order && (
          <div className='mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Order ID</p>
                <p className='font-mono text-sm text-slate-800'>{String(order._id)}</p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[order.status]}`}>
                {order.status === 'processing' ? <Clock className='h-3.5 w-3.5' /> : order.status === 'delivered' ? <CheckCircle2 className='h-3.5 w-3.5' /> : <Package className='h-3.5 w-3.5' />}
                {order.status}
              </span>
            </div>

            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Payment Intent ID</p>
                <p className='mt-1 break-all font-mono text-sm text-slate-800'>{order.paymentIntentId}</p>
              </div>
              <div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Total Amount</p>
                <p className='mt-1 text-sm font-semibold text-slate-800'>${Number(order.totalAmount).toFixed(2)}</p>
              </div>
            </div>

            <div className='mt-5'>
              <h3 className='mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600'>
                <Receipt className='h-4 w-4 text-blue-600' />
                Ordered Items
              </h3>
              <div className='space-y-3'>
                {order.products.map((item, idx) => (
                  <div key={`${String(item.productId._id)}-${idx}`} className='flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3'>
                    <div>
                      <p className='text-sm font-medium text-slate-800'>{item.productId.name}</p>
                      <p className='mt-1 text-xs text-slate-600'>Qty: {item.orderedQuantity} × ${Number(item.price).toFixed(2)}</p>
                    </div>
                    <p className='text-sm font-semibold text-slate-800'>${(Number(item.price) * Number(item.orderedQuantity)).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
