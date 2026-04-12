import React from 'react'
import { 
  ShoppingCart, 
  Package, 
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { useOrderStats } from '@/hooks/useOrderStats'

function Stats() {
  const stats = {
    totalRevenue: 0,
    revenueChange: 0,
    totalOrders: 0,
    ordersChange: 0,
    totalProducts: 0,
    productsChange: 0,
    activeCustomers: 0,
    customersChange: 0
  }

  const {data: orderStats, error, isLoading} = useOrderStats()

  return ( 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.revenueChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.revenueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.revenueChange)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">vs last month</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.ordersChange > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.ordersChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.ordersChange)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {orderStats && orderStats.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">vs last month</p>
        </div>

        {/* Total Products Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.productsChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.productsChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.productsChange)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {stats.totalProducts.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">Active listings</p>
        </div>

        {/* Active Customers Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <span className={`flex items-center text-sm font-medium ${stats.customersChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.customersChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.customersChange)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Active Customers</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {stats.activeCustomers.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">This month</p>
        </div>
      </div>
  )
}

export default Stats