'use client'
import React from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react'

// This is a placeholder component - you'll implement the API and backend
function DashboardHomePage() {
  // TODO: Fetch these from your API
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

  const recentOrders: any[] = []
  const lowStockProducts: any[] = []
  const topSellingProducts: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
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
            <span className={`flex items-center text-sm font-medium ${stats.ordersChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {stats.ordersChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(stats.ordersChange)}%
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            {stats.totalOrders.toLocaleString()}
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link
            href="/dashboard/products/new"
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:from-emerald-100 hover:to-emerald-200 transition-all group border border-emerald-200"
          >
            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Add Product</span>
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group border border-blue-200"
          >
            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">View Orders</span>
          </Link>

          <Link
            href="/dashboard/products"
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all group border border-purple-200"
          >
            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
              <Edit className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Manage Products</span>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all group border border-amber-200"
          >
            <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Analytics</span>
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
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
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
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

        {/* Low Stock Alert */}
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
      </div>

      {/* Top Selling Products */}
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
    </div>
  )
}

export default DashboardHomePage
