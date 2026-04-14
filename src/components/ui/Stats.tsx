import React from 'react'
import { 
  ShoppingCart, 
  Package, 
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react' 
import { useStats } from '@/hooks/useStats'

function Stats() {
  // const stats = {
  //   totalRevenue: 0,
  //   revenueChange: 0,
  //   totalOrders: 0,
  //   ordersChange: 0,
  //   totalProducts: 0,
  //   productsChange: 0,
  //   activeCustomers: 0,
  //   customersChange: 0
  // }

  const { revenue, order, products, activeCustomers } = useStats()
  // const talha = [revenue, order, products, activeCustomers]

  return ( 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${revenue >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {revenue >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(revenue)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            ${revenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">vs last month</p>
        </div>  

        {/* Total Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${order > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {order > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(order)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {order.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">vs last month</p>
        </div>

        {/* Total Products Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${products >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {products >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(products)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {products.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">Active listings</p>
        </div>

        {/* Active Customers Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${activeCustomers >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {activeCustomers >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(activeCustomers)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Active Customers</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {activeCustomers.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">This month</p>
        </div>
      </div>
  )
}

export default Stats