import { CheckCircle, Clock,  DollarSign, Package, ShoppingBag, XCircle } from 'lucide-react';
import React from 'react'

export default function OrderStats({stats}:{stats: {
    totalOrders: number;
    pending: number;
    processing: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;  }}) {
  return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-slate-700" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Processing</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.processing}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.delivered}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold mt-1">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

  )
}
