import React from 'react'
import { 
  TrendingUp, 
  ArrowUpRight, 
} from 'lucide-react'
import Link from 'next/link'




function TopSelling() {

  const topSellingProducts: any[] = []
  return (
     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Top Selling Products</h2>
          <Link href="/dashboard/analytics" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            View Details <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {topSellingProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium mb-2">No sales data yet</p>
            <p className="text-sm text-slate-400">Top products will appear here once you start selling</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSellingProducts.map((product: any, index: number) => (
              <div key={product._id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-start space-x-3">
                    <img
                      src={product.images[0] || '/placeholder.png'}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-slate-800 mb-1">{product.name}</p>
                      <p className="text-sm text-slate-500 mb-2">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-emerald-600">${product.price}</span>
                        <span className="text-xs text-slate-500">150 sold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default TopSelling