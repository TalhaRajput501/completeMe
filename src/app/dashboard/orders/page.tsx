'use client'
import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  DollarSign,
  ShoppingBag
} from 'lucide-react'
import { toast } from 'sonner'
import { DashboardOrderStatus, getAllOrders, getOrderStats, searchOrders } from '@/lib/actions/orders.actions'
import { OrderType } from '@/models/orders.model'
import useDebounceValue from '@/hooks/useDebounceValue'
import OrderStats from '@/components/ui/OrderStats'
import { formatDate } from '@/lib/utils'
import EachOrder from '@/components/ui/EachOrder'

 

export default function OrdersPage() {

  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState<OrderType[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0
  })
  const [statusFilter, setStatusFilter] = useState<DashboardOrderStatus>('all')
  const [expandedOrder, setExpandedOrder] = useState<string>('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)



  // Fetch order stats for dashboard cards
  const getStats = async () => {
    try {
      const orderStats = await getOrderStats()
      // console.log('These are order stats ', orderStats)
      setStats(orderStats)
    } catch (error) {
      console.error('Error fetching order stats:', error)
      toast.error('Failed to load order stats. Please try again later.')
    }
  }
  // This will only fetch Stats for orders 
  useEffect(() => {
    async function fetchStats() {
      try {
        await getStats()
      }
      catch (error) {
        console.error('Error fetching order stats:', error)
      }
    }
    fetchStats()
  }, [])


  // Debounced serch 
  const debouncedValue = useDebounceValue({ value: searchQuery, delay: 500 })

  async function fetchInfo() {
    try {
      if (debouncedValue) {
        const filter = await searchOrders({ query: debouncedValue })
        // console.log('These are filtered orders in client: ', filter)
        setOrders(filter)
        return
      } else {
        const orders = await getAllOrders({ page, limit ,filterValue: statusFilter === 'all' ? undefined : statusFilter as DashboardOrderStatus})
        // console.log('These are orders in client: ', orders)
        setOrders(orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders. Please try again later.')
    }
  }

  // This will fetch orders based on search query, status filter and pagination
  useEffect(() => { 
    fetchInfo()
  }, [debouncedValue, statusFilter, page])

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Orders Management</h1>
          <p className="text-slate-600 mt-1">Track and manage all customer orders</p>
        </div>

        <button onClick={getStats} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      
      <OrderStats stats={stats} />
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, or Payment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-800 font-medium placeholder:text-slate-500 placeholder:font-normal"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DashboardOrderStatus)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 
             bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
             bg-no-repeat bg-[position:right_0.75rem_center] bg-[size:1rem] text-slate-800 font-medium"
          >
            <option value="all" className="text-slate-800 bg-white">All Status</option>
            <option value="draft" className="text-slate-800 bg-white">Draft</option>
            <option value="pending" className="text-slate-800 bg-white">Pending</option>
            <option value="processing" className="text-slate-800 bg-white">Processing</option>
            <option value="delivered" className="text-slate-800 bg-white">Delivered</option>
            <option value="cancelled" className="text-slate-800 bg-white">Cancelled</option>
          </select>

        </div>

        <div className="mt-3 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-800">{orders.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{orders.length}</span> orders
        </div>


        <div className="flex flex-col lg:flex-row gap-4">
          <button>
            Reload
            
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Orders Found</h3>
            <p className="text-slate-600">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Orders will appear here once customers place them'}
            </p>
          </div>
        ) : (
          <div>
            {
              orders.map((order) => (
                <EachOrder 
                  key={String(order._id)} 
                  order={order} 
                  expandedOrder={expandedOrder}
                  setExpandedOrder={setExpandedOrder}
                  onOrderStatusUpdated={async () => {
                    await fetchInfo()
                    await getStats()
                  }}
                />

              ))
            }


            {/* Pagination Buttons */}
            <div className='w-full mt-5 justify-center flex mx-auto '>
              <button
                className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                className="ml-2 px-4 py-2 bg-white rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage(page + 1)}
              disabled={orders.length < 12 ? true : false}
              >
                Next
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
