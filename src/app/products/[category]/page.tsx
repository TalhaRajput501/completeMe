'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, SlidersHorizontal, Grid3x3, List, Package } from 'lucide-react'
import { getProducts } from '@/lib/actions/products.actions'
import { ProductType } from '@/schemas/product.schema'
import Card from '@/components/ui/Card'
import LoadingIcon from '@/components/ui/LoadingIcon'

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await getProducts()
        // Filter products by category
        const filteredProducts = allProducts.filter(
          (product: ProductType) => product.category.toLowerCase() === category.toLowerCase()
        )
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching category products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [category])

  if (loading) {
    return <LoadingIcon />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium capitalize">{category}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 capitalize mb-2">
                {category}
              </h1>
              <p className="text-slate-600">
                Explore our collection of {products.length} {category === 'watch' ? 'watches' : category === 'shoe' ? 'shoes' : 'clothes'}
              </p>
            </div>

            {/* View Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium text-slate-700 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span className="font-medium">{products.length} Products</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium text-slate-700">Sort by:</label>
              <select className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {products.length > 0 ? (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'flex flex-col gap-4'
            }
          `}>
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.category}/${product._id}/${product.name.replaceAll(' ', '-')}`}
                className="group"
              >
                <div className={`
                  bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden
                  transition-all duration-300 hover:shadow-md hover:-translate-y-1
                  ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}
                `}>
                  {/* Product Image */}
                  <div className={`
                    relative bg-slate-50 overflow-hidden
                    ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full aspect-square'}
                  `}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock === 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Low Stock
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">
                          ${product.price}
                        </p>
                        {product.brand && (
                          <p className="text-xs text-slate-500 mt-1">{product.brand}</p>
                        )}
                      </div>
                      
                      {product.stock > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-600 mb-6">
              There are no products in the {category} category at the moment.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
