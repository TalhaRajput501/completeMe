import React from 'react'
import {
  BellRing,
  Boxes,
  CircleDollarSign,
  LayoutPanelTop,
  PackageCheck,
  Store,
  Truck,
} from 'lucide-react'

const suggestedSettings: {
  title: string
  description: string
  priority: 'Essential' | 'Recommended' | 'Optional'
  icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    title: 'Store Profile',
    description: 'Store name, support email, support phone, and business address.',
    priority: 'Essential',
    icon: Store,
  },
  {
    title: 'Catalog Preferences',
    description: 'Category visibility for watches, clothes, and shoes plus default sorting.',
    priority: 'Essential',
    icon: Boxes,
  },
  {
    title: 'Order Workflow',
    description: 'Default order status flow (pending → processing → delivered/cancelled).',
    priority: 'Essential',
    icon: PackageCheck,
  },
  {
    title: 'Shipping Defaults',
    description: 'Shipping fee, free-delivery threshold, and delivery note template.',
    priority: 'Recommended',
    icon: Truck,
  },
  {
    title: 'Taxes & Currency',
    description: 'Currency format, tax display mode, and checkout totals behavior.',
    priority: 'Recommended',
    icon: CircleDollarSign,
  },
  {
    title: 'Homepage Content',
    description: 'Hero text, featured categories order, and promo banner visibility.',
    priority: 'Optional',
    icon: LayoutPanelTop,
  },
  {
    title: 'Admin Alerts',
    description: 'Email alerts for new orders, low stock, and payment or webhook failures.',
    priority: 'Recommended',
    icon: BellRing,
  },
]

const priorityStyles = {
  Essential: 'bg-blue-100 text-blue-700',
  Recommended: 'bg-emerald-100 text-emerald-700',
  Optional: 'bg-slate-100 text-slate-700',
} as const

function General() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">General Settings</h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Suggested settings for your ecommerce store (watches, clothes, and shoes).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {suggestedSettings.map(({ title, description, priority, icon: Icon }) => (
          <article
            key={title}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-slate-200 bg-white p-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">{title}</h3>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
              >
                {priority}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        Start with <span className="font-semibold">Essential</span> settings, then add{' '}
        <span className="font-semibold">Recommended</span> options as you wire backend APIs.
      </div>
    </div>
  )
}

export default General
