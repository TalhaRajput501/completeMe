import React from 'react'
import { 
  ArrowUpRight, 
  CheckCircle, 
} from 'lucide-react'
import Link from 'next/link'



function LowStock() {

  const lowStockProducts: any[] = []
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Low Stock Alert</h2>
        <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="p-4 bg-emerald-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-slate-500 font-medium mb-2">All products in stock</p>
          <p className="text-sm text-slate-400">You'll be notified when stock runs low</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product: any) => (
            <div key={product._id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
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
                <Link href={`/dashboard/products`} className="text-xs text-blue-600 hover:underline">
                  Restock
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LowStock