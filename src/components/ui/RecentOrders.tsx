import React from 'react'
import {
  ShoppingCart,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'


function RecentOrders() {
  const recentOrders: any[] = []
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
        <Link href="/dashboard/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="p-4 bg-slate-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium mb-2">No orders yet</p>
          <p className="text-sm text-slate-400">Orders will appear here once customers make purchases</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order: any) => (
            <div key={order._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-lg">
                  {order.status === 'delivered' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  {order.status === 'processing' && <Clock className="w-5 h-5 text-blue-600" />}
                  {order.status === 'pending' && <AlertCircle className="w-5 h-5 text-amber-600" />}
                  {order.status === 'cancelled' && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="font-medium text-slate-800">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-slate-500">{order.customerInfo?.name || 'Guest'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">${order.totalAmount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentOrders