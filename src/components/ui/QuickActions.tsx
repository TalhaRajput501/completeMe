import Link from 'next/link'
import { 
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react'


function QuickActions() {
  return ( 
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

  )
}

export default QuickActions