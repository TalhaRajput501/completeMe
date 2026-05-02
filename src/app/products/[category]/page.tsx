'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Grid3x3, List, Package, Funnel } from 'lucide-react'
import { getProductsWithFilters } from '@/lib/actions/products.actions'
import { ProductType } from '@/schemas/product.schema'
import LoadingIcon from '@/components/ui/LoadingIcon'
import ImageSkeleton from '@/components/ui/ImageSkeleton'
import Image from 'next/image'
import { truncateLetter } from '@/lib/utils'
import { toast } from 'sonner'
import { FilterOption, ProductCategory } from '../../../../types/productTypes'
import FilterPopUp from '@/components/ui/FilterPopUp'
import Pills from '@/components/ui/Pills'
import ProductCard from '@/components/ui/ProductCard'
import { SelectOption } from '../../../../types/productStyle'



export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<FilterOption>('newest')
  const [selectedSort, setSelectedSort] = useState<SelectOption[]>([{ value: 'newest', label: 'Newest' }])



  const [showFilterBox, setShowFilterBox] = useState<boolean>(false)

  const sortPillOptions: SelectOption[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
  ]

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await getProductsWithFilters(
          category as ProductCategory,
          page,
          12,
          [filter]
        )
        setLastPage(allProducts.length < 12)
        // console.log('Products fetched for category:', allProducts)
        setProducts(allProducts)
      } catch (error) {
        console.error('Error fetching category products:', error)
        toast.error('Failed to load products for this category. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [category, page, filter])

  useEffect(() => {
    const selected = selectedSort[0]
    if (selected) {
      setFilter(selected.value as FilterOption)
    }
  }, [selectedSort])




  // if (loading) {
  //   return <ImageSkeleton />
  // }

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
              {/* <p className="text-slate-600">
                Explore our collection of {products.length} {category === 'watch' ? 'watches' : category === 'shoe' ? 'shoes' : 'clothes'}
              </p> */}
            </div>

            {/* View Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
                  }`}
                title="Grid View"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list'
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

        {/* Filter Pop-up */}
        <FilterPopUp
          isOpen={showFilterBox}
          onClose={() => setShowFilterBox(false)}
        >

          <div
            className='flex flex-col  '
          >
            <div
              className='  '
            >
              <div className='flex flex-col'>
                <h1 className='text-sm font-semibold text-slate-700 mb-2'>Sort Products</h1>
                <div className='flex flex-wrap'>
                  <Pills
                    pillOptions={sortPillOptions}
                    selected={selectedSort}
                    setSelected={setSelectedSort}
                  />
                </div>
              </div>

              {/* <button
                type='button'
                onClick={() => setShowFilterBox(false)}
                className='items-center justify-center flex mt-4 mx-auto p-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer text-white content-center transition-colors'
              >
                <p className='pr-2' >Apply Filters</p>
                <Funnel className='text-white p-0.5' />
              </button> */}

            </div>
          </div>
        </FilterPopUp>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* <button
                onClick={() => setShowFilterBox(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium text-slate-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button> */}

              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span className="font-medium">{products.length} Products</span>
              </div>
            </div>

            {/* Results for selected filter */}
            {
              filter !== 'newest' &&
              <div className='hidden sm:flex items-center border-l border-slate-200 pl-4'>
                <p className='text-sm text-slate-600'>
                  Showing results for <span className='font-semibold text-slate-800'>&quot;{sortPillOptions.find((option) => option.value === filter)?.label}&quot;</span>
                </p>
              </div>
            }

            {/* Filter Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type='button'
                onClick={() => setShowFilterBox(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                <Funnel className="w-4 h-4 text-blue-600" />
                {sortPillOptions.find((option) => option.value === filter)?.label ?? 'Sort'}
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {
          products.length > 0 || loading ?
            (
              <div className='w-full flex flex-col'>
                <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'} `}>
                  {loading || products.length === 0 ? (
                    <div className="col-span-full w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
                      <LoadingIcon />
                    </div>
                  ) : (    
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} viewMode={viewMode} />
                    ))
                  )}

                </div>

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
                    disabled={lastPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) :
            (
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
            )

        }


      </div>
    </div>
  )
}
