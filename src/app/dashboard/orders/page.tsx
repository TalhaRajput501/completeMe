'use client'
import React, { useState, useMemo } from 'react'
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

// Order type based on schema
interface OrderProduct {
  productId: {
    _id: string
    name: string
    images: string[]
    price: number
  }
  orderedQuantity: number
  price: number
}

interface Order {
  _id: string
  products: OrderProduct[]
  customerInfo?: {
    name: string
    address: string
    phone: number
  }
  paymentIntentId: string
  status: 'draft' | 'pending' | 'processing' | 'delivered' | 'cancelled'
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export default function OrdersPage() {
  // Sample demo data - Replace with actual API call: const orders = await fetchOrders()
  const [orders] = useState<Order[]>([
    {
      _id: '507f1f77bcf86cd799439011',
      products: [
        {
          productId: {
            _id: '1',
            name: 'Premium Leather Watch',
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
            price: 299.99
          },
          orderedQuantity: 2,
          price: 299.99
        },
        {
          productId: {
            _id: '2',
            name: 'Classic Sneakers',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
            price: 129.99
          },
          orderedQuantity: 1,
          price: 129.99
        }
      ],
      customerInfo: {
        name: 'John Smith',
        address: '123 Main Street, New York, NY 10001',
        phone: 5551234567
      },
      paymentIntentId: 'pi_3AbC123def456GHI',
      status: 'processing',
      totalAmount: 729.97,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '507f1f77bcf86cd799439012',
      products: [
        {
          productId: {
            _id: '3',
            name: 'Cotton T-Shirt',
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
            price: 29.99
          },
          orderedQuantity: 3,
          price: 29.99
        }
      ],
      customerInfo: {
        name: 'Sarah Johnson',
        address: '456 Oak Avenue, Los Angeles, CA 90001',
        phone: 5559876543
      },
      paymentIntentId: 'pi_3XyZ789abc012DEF',
      status: 'delivered',
      totalAmount: 89.97,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '507f1f77bcf86cd799439013',
      products: [
        {
          productId: {
            _id: '4',
            name: 'Sports Watch Pro',
            images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'],
            price: 499.99
          },
          orderedQuantity: 1,
          price: 499.99
        }
      ],
      customerInfo: {
        name: 'Michael Chen',
        address: '789 Elm Street, Chicago, IL 60601',
        phone: 5551112222
      },
      paymentIntentId: 'pi_3QwE456rty789UIO',
      status: 'pending',
      totalAmount: 499.99,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      _id: '507f1f77bcf86cd799439014',
      products: [
        {
          productId: {
            _id: '5',
            name: 'Running Shoes',
            images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400'],
            price: 159.99
          },
          orderedQuantity: 2,
          price: 159.99
        }
      ],
      paymentIntentId: 'pi_3JkL012mno345PQR',
      status: 'cancelled',
      totalAmount: 319.98,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.paymentIntentId.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, statusFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pending').length
    const processing = orders.filter(o => o.status === 'processing').length
    const delivered = orders.filter(o => o.status === 'delivered').length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0)

    return { total, pending, processing, delivered, cancelled, totalRevenue }
  }, [orders])

  // Status badge component
  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const config = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    }

    const { bg, text, icon: Icon } = config[status]

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Orders Management</h1>
          <p className="text-slate-600 mt-1">Track and manage all customer orders</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
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
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white text-slate-800 font-medium cursor-pointer"
          >
            <option value="all" className="text-slate-800 bg-white">All Status</option>
            <option value="draft" className="text-slate-800 bg-white">Draft</option>
            <option value="pending" className="text-slate-800 bg-white">Pending</option>
            <option value="processing" className="text-slate-800 bg-white">Processing</option>
            <option value="delivered" className="text-slate-800 bg-white">Delivered</option>
            <option value="cancelled" className="text-slate-800 bg-white">Cancelled</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium">
            <Filter className="w-4 h-4 text-slate-600" />
            More Filters
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-800">{filteredOrders.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{orders.length}</span> orders
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
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
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-slate-800">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.createdAt)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Package className="w-4 h-4" />
                            {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info - if available */}
                    {order.customerInfo && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {order.customerInfo.name}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4" />
                          {order.customerInfo.phone}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Total & Actions */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Total Amount</p>
                      <p className="text-2xl font-bold text-slate-800">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {expandedOrder === order._id ? (
                        <ChevronUp className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
                  {/* Payment Info */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payment Information
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-600">Payment Intent ID:</span>
                        <p className="font-mono text-slate-800 mt-1">{order.paymentIntentId}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Updated:</span>
                        <p className="text-slate-800 mt-1">{formatDate(order.updatedAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address - if available */}
                  {order.customerInfo?.address && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                      </h4>
                      <p className="text-slate-700">{order.customerInfo.address}</p>
                    </div>
                  )}

                  {/* Products List */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.products.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                          {item.productId.images?.[0] && (
                            <img
                              src={item.productId.images[0]}
                              alt={item.productId.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className="font-medium text-slate-800">{item.productId.name}</h5>
                            <p className="text-sm text-slate-600 mt-1">
                              Quantity: {item.orderedQuantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-800">
                              ${(item.orderedQuantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                      <Eye className="w-4 h-4" />
                      View Full Details
                    </button>
                    
                    {order.status === 'pending' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Package className="w-4 h-4" />
                        Mark as Processing
                      </button>
                    )}
                    
                    {order.status === 'processing' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Mark as Delivered
                      </button>
                    )}
                    
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
