import React from 'react'
import { AlertCircle, CheckCircle, Clock, Package, XCircle } from 'lucide-react'
import { OrderType } from '@/models/orders.model'


// Status badge component
export const StatusBadge = ({ status }: { status: OrderType['status'] }) => {
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

