'use client'
import React from 'react' 
import Stats from '@/components/ui/Stats'
import QuickActions from '@/components/ui/QuickActions'
import RecentOrders from '@/components/ui/RecentOrders'
import LowStock from '@/components/ui/LowStock'
import TopSelling from '@/components/ui/TopSelling'

// This is a placeholder component - you'll implement the API and backend
function DashboardHomePage() {

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
      <Stats />

      {/* Quick Actions */}
      <QuickActions />


      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <RecentOrders />

        {/* Low Stock Alert */}
        <LowStock />
      </div>

      {/* Top Selling Products */}
      <TopSelling />

    </div>
  )
}

export default DashboardHomePage
