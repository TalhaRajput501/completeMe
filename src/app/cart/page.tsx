'use client'
import CartItem from '@/components/ui/CartItem'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import React from 'react'
import EmptyCart from '@/components/ui/EmptyCart'
import { useAppSelector } from '@/lib/store/reduxHooks'
import OrderSummary from '@/components/ui/OrderSummary'


export default function Page() {
  const reduxCart = useAppSelector(state => state.cart.products)

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8'>
        {/* <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'> */}
          <div className='w-full px-2'>
          <CheckoutProgress firstPage />
          </div>
        {/* </section> */}

        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12'>
          <section className='lg:col-span-8 xl:col-span-9'>
            <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>Cart Items</h1>
                <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 sm:text-sm'>
                  {reduxCart.length} {reduxCart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {reduxCart.length !== 0 ? (
                <div className='space-y-4'>
                  {reduxCart.map(eachProduct => (
                    <CartItem key={eachProduct._id} product={eachProduct} />
                  ))}
                </div>
              ) : (
                <EmptyCart />
              )}
            </div>
          </section>

          <aside className='lg:col-span-4 xl:col-span-3'>
            <OrderSummary buttonVisibility buttonText='Continue to Checkout' buttonUrl='checkout' />
          </aside>
        </div>
      </div>
    </div>
  )
}
