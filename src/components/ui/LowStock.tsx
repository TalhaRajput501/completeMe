'use client'
import React, { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle,
  RotateCw,
} from 'lucide-react'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { StockAlertPayload } from '@/lib/actions/orders.actions'
import { refreshLowStockProducts } from '@/lib/actions/products.actions'

function LowStock() {


  // const temp = async () => {

  // sendStockAlert({
  //       name:   "Unknown Product",
  //       images: [],
  //       category: "watch",
  //       stock: 7,
  //     }).then(data => console.log('This is the response from backend when it  s low stock: ', data)).catch(err => console.error('This is the error from backend when it s low stock: ', err))
  // console.log('Data in low stock products: ',lowStockProducts)
  // } 


  const [lowStockProducts, setlowStockProducts] = useState<StockAlertPayload[]>([])
  const [reloading, setReloading] = useState(false)

  useEffect(() => {
    let pusher: Pusher | null = null;
    if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) return
    // First it will make pusher instance
    pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })

    // Then subscribe a channel which is created in backend 
    const channel = pusher.subscribe('order-channel');

    // Now listen on that event that is make in backend as well
    channel.bind('stock-alert-event', (data: StockAlertPayload) => {
      console.log('This is the pub sub data: ', data)
      setlowStockProducts((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === data.id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = data
          return updated
        }
        return [data, ...prev]
      })
    })

    return () => {
      if (pusher) pusher.disconnect()
    }
  }, [])

  const handleReloadLowStock = async () => {
    try {
      setReloading(true)
      const ids = lowStockProducts.map((product) => product.id)
      const refreshed = await refreshLowStockProducts(ids)
      setlowStockProducts(refreshed)
    } catch (error) {
      console.error('Error reloading low stock products:', error)
    } finally {
      setReloading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Low Stock Alert</h2>
        <div className='flex items-center gap-3'>
          <button
            onClick={handleReloadLowStock}
            disabled={reloading}
            className='inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            <RotateCw className={`w-3.5 h-3.5 ${reloading ? 'animate-spin' : ''}`} />
            Reload
          </button>
          <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            View All <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="p-4 bg-emerald-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-slate-500 font-medium mb-2">All products in stock</p>
          <p className="text-sm text-slate-400">You&apos;ll be notified when stock runs low</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product: StockAlertPayload, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center space-x-4">
                <img
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-slate-800">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{product.stock} left</p>
                <Link href={`/dashboard/product/${product.id}`} className="text-xs text-blue-600 hover:underline">
                  Restock
                </Link>
              </div>
            </div>
          ))}

        </div>
      )
      }
    </div>

  )
}

export default LowStock
