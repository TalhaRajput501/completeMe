'use client'
import React, { lazy, Suspense, useState } from 'react'
import { Settings2, ShieldUser } from 'lucide-react'

type Tabs = 'general' | 'account'

const GeneralSettings = lazy(() => import('@/components/ui/General'))
const AccountSettings = lazy(() => import('@/components/ui/Account'))

const tabs: {
  id: Tabs
  label: string
  helper: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    id: 'general',
    label: 'General',
    helper: 'Store preferences and defaults',
    icon: Settings2,
  },
  {
    id: 'account',
    label: 'Account',
    helper: 'Admin password and security',
    icon: ShieldUser,
  },
]

const LoadingFallback = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
    Loading settings...
  </div>
)

function Page() {
  const [currentTab, setCurrentTab] = useState<Tabs>('general')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Manage store preferences and admin account settings.
        </p>

        <div className="border border-slate-200 bg-white mt-5 rounded-xl p-2 shadow-sm">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {tabs.map(({ id, label, helper, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setCurrentTab(id)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${currentTab === id
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : 'border-transparent text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base font-semibold">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">{helper}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <Suspense fallback={<LoadingFallback />}>
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            {currentTab === 'general' ? <GeneralSettings /> : <AccountSettings />}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Page
