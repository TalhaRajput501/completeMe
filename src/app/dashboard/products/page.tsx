'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { SlidersHorizontal, Plus, Funnel, ChevronDown, Trash2, SquarePen, ListRestart, RotateCw, View, Eye, Search, Download, Upload, PackageX, Package, TrendingUp, Archive } from 'lucide-react'
import Link from 'next/link'
import FilterPopUp from '@/components/ui/FilterPopUp'
import Pills, { Option } from '@/components/ui/Pills'
import UpdateDrawer from '@/components/ui/UpdateDrawer'
import { getProducts } from '../../../lib/actions/products.actions'
import { ProductType } from '@/schemas/product.schema'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import loader from '@/assets/loader2.gif'
import StockStatusPill from '@/components/ui/StockStatusPill'


export default function Page() {

  const filterOptions: Record<string, Option[]> = {
    genderOptions: [
      { value: 'men', label: 'Male' },
      { value: 'women', label: 'Female' },
      { value: 'unisex', label: 'Unisex' },
    ],

    featureOptions: [
      { value: "analog", label: "Analog Display" },
      { value: "digital", label: "Digital Display" },
      { value: "smart", label: "Smart Watch" },
      { value: "waterresistant", label: "Water Resistant" },
      { value: "stainlesssteel", label: "Stainless Steel" },
      { value: "chronograph", label: "Chronograph Function" },
      { value: "leatherstrap", label: "Leather Strap" },
    ],

    sizeOptions: [
      { value: "28mm", label: "28 mm (Small)" },
      { value: "32mm", label: "32 mm (Medium - Women)" },
      { value: "36mm", label: "36 mm (Unisex)" },
      { value: "40mm", label: "40 mm (Standard Men’s)" },
      { value: "44mm", label: "44 mm (Large Dial)" },
      { value: "46mm", label: "46 mm (Extra Large)" },
    ],

    categoryOptions: [
      { value: 'watch', label: 'Watches' },
      { value: 'shoe', label: 'Shoes' },
      { value: 'cloth', label: 'Clothes' },
    ]

  }

  // const [inputClicked, setInputClicked] = useState(false)

  // Selection for filters 
  const [selectedGenders, setSelectedGenders] = useState<Option[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<Option[]>([])
  const [selectedSize, setSelectedSize] = useState<Option[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Option[]>([])


  const [showFilterBox, setShowFilterBox] = useState<boolean>(false)
  const [showUpdateDrawer, setShowUpdateDrawer] = useState<boolean>(false)
  const [currentProductDetailBox, setCurrentProductDetailBox] = useState<string | null>(null)
  const [showProductDetailBox, setShowProductDetailBox] = useState<boolean>(false)
  const [reloadEnable, setReloadEnable] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState<boolean>(false)

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products
    const query = searchQuery.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [products, searchQuery])

  // Calculate stats
  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter(p => p.isActive).length
    const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length
    const outOfStock = products.filter(p => p.stock === 0).length
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    
    return { total, active, lowStock, outOfStock, totalValue }
  }, [products])

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p._id!)))
    }
    setSelectAll(!selectAll)
  }

  // Handle individual checkbox
  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
    setSelectAll(newSelected.size === filteredProducts.length)
  }

  // This is for Reload Button
  const myProducts = async () => {
    setReloadEnable(false)
    console.log('entering in the my products section')
    try {
      const allProducts = await getProducts()
      setProducts(allProducts)
      console.log(allProducts)
      setReloadEnable(true)
    } catch (error) {
      console.log('error in frontend in get all products ', error)
    }
  }

  useEffect(() => {
    myProducts()
  }, [])


  const handleDetailBox = (productId: string) => {

    if (currentProductDetailBox === productId) {
      // now assume that box is already opened
      setShowProductDetailBox(false);
      setCurrentProductDetailBox(null);
    }
    // Otherwise → open the clicked one 
    else {
      setCurrentProductDetailBox(productId);
      setShowProductDetailBox(true);
    }

    console.log(showProductDetailBox)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Product Inventory
        </h1>
        <p className="text-slate-600">Manage your product catalog and inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
          <p className="text-xs text-slate-600">Total Products</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.active}</p>
          <p className="text-xs text-slate-600">Active</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Archive className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.lowStock}</p>
          <p className="text-xs text-slate-600">Low Stock</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <PackageX className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.outOfStock}</p>
          <p className="text-xs text-slate-600">Out of Stock</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-600 text-lg">$</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">${stats.totalValue.toLocaleString()}</p>
          <p className="text-xs text-slate-600">Inventory Value</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
        {/* Search and Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search by name, category, brand, or tags..."
              type="text"
            />
          </div>



          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/products/new">
              <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </Link>

            <button
              onClick={() => setShowFilterBox(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              onClick={myProducts}
              disabled={!reloadEnable}
              className="px-4 py-2.5 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <RotateCw className={`w-4 h-4 ${!reloadEnable ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Reload</span>
            </button>

            <button
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
              title="Export to CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
              title="Import from CSV"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar - Show when products are selected */}
        {selectedProducts.size > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedProducts.size} product{selectedProducts.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded font-medium transition-colors">
                Activate
              </button>
              <button className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded font-medium transition-colors">
                Deactivate
              </button>
              <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-3 px-2"></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Brand</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-slate-200">
              {
                filteredProducts.length !== 0 ? filteredProducts.map(product => (
                  <React.Fragment key={product._id}>
                    <tr
                      onClick={() => handleDetailBox(product._id!)}
                      className={`transition-colors hover:bg-slate-50 cursor-pointer ${product._id === currentProductDetailBox ? 'bg-slate-50' : ''}`}
                    >
                      {/* Select checkbox */}
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product._id!)}
                          onChange={() => handleSelectProduct(product._id!)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>

                      {/* Expand arrow */}
                      <td className="py-3 px-2">
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${product._id === currentProductDetailBox && showProductDetailBox ? 'rotate-180' : ''}`} />
                      </td>

                      {/* Product info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            draggable={false}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-medium text-slate-800">{product.name}</p>
                            <p className="text-xs text-slate-500">ID: {product._id?.slice(-6)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {product.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-700 font-medium">{product.brand || '-'}</td>

                      <td className="py-3 px-4 text-slate-800 font-semibold">${product.price}</td>

                      <td className="py-3 px-4">
                        <span className={`font-semibold ${
                          product.stock === 0 ? 'text-red-600' :
                          product.stock < 10 ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {product.isActive ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>

                    {/* Product Detail Expanded Row */}
                    {product._id === currentProductDetailBox && showProductDetailBox && (
                      <tr>
                        <td colSpan={8} className="bg-slate-50 border-t border-slate-200">
                          <div className="p-6">
                            {/* Product Images */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              {product.images.map((img, idx) => (
                                <div key={idx} className="relative h-48 rounded-lg overflow-hidden border border-slate-200 bg-white">
                                  <Image
                                    fill
                                    alt={`${product.name} - ${idx + 1}`}
                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                    src={img}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Product Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              {/* Description */}
                              <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <h3 className="font-semibold text-slate-800 text-lg mb-2 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                  Description
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
                              </div>

                              {/* Material */}
                              {product.material && (
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                  <h3 className="font-semibold text-slate-800 text-lg mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                    Material
                                  </h3>
                                  <p className="text-slate-600 text-sm">{product.material}</p>
                                </div>
                              )}
                            </div>

                            {/* Product Attributes */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              {/* Features */}
                              {product.features && product.features.length > 0 && (
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                  <h3 className="font-semibold text-slate-800 text-sm mb-3">Features</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.features.map((feature) => (
                                      <Badge key={feature} className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Gender */}
                              {product.gender && product.gender.length > 0 && (
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                  <h3 className="font-semibold text-slate-800 text-sm mb-3">Gender</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.gender.map((g) => (
                                      <Badge key={g} className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-0 capitalize">
                                        {g}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Size Options */}
                              {product.sizeOptions && product.sizeOptions.length > 0 && (
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                  <h3 className="font-semibold text-slate-800 text-sm mb-3">Size Options</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.sizeOptions.map((size) => (
                                      <Badge key={size} className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0">
                                        {size}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tags */}
                              <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <h3 className="font-semibold text-slate-800 text-sm mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                  {product.tags.map((tag) => (
                                    <Badge key={tag} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                                <SquarePen className="w-4 h-4" />
                                Edit Product
                              </button>

                              <Link href={`/product/${product.category}/${product._id}/${product.name.replaceAll(' ', '-')}`}>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                                  <Eye className="w-4 h-4" />
                                  View on Store
                                </button>
                              </Link>

                              <button
                                className={`px-4 py-2 ${product.isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm`}
                              >
                                <Archive className="w-4 h-4" />
                                {product.isActive ? 'Deactivate' : 'Activate'}
                              </button>

                              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                                <Plus className="w-4 h-4" />
                                Duplicate
                              </button>

                              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm ml-auto">
                                <Trash2 className="w-4 h-4" />
                                Delete Product
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )) : products.length === 0 ? (
                  // Loading state
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <Image className="w-16 mx-auto" src={loader} alt="loading..." />
                      <p className="mt-4 text-slate-600">Loading products...</p>
                    </td>
                  </tr>
                ) : (
                  // No results found
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Search className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-slate-600 font-medium">No products found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your search query</p>
                      </div>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <div className="mt-4 text-sm text-slate-600 text-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>







        {/* <button
          onClick={() => console.log(products)}
          className='bg-red-400 px-3 py-1 text-white'
        >
          show Product
        </button>

        <button
          className='bg-red-400 m-5 px-3 py-1 text-white'
        >
          again call function
        </button> */}      {/* Update Drawer */}
      <UpdateDrawer
        isOpen={showUpdateDrawer}
        onClose={() => setShowUpdateDrawer(false)}
      >

        <div
          className={`bg-yellow-500  `}
        >
          hello
        </div>
      </UpdateDrawer>


      {/* This is the Filter PopUp */}
      <div>
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

              {/* Category Filters */}
              <div
                className='flex flex-col'
              >
                <h1>Select Category</h1>
                <div
                  className='flex flex-wrap'
                >
                  <Pills
                    pillOptions={filterOptions.categoryOptions}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                  />
                </div>
              </div>

              {/* Gender Filters */}
              <div
                className='flex flex-col'
              >
                <h1>Select Gender</h1>
                <div
                  className='flex flex-wrap'
                >
                  <Pills
                    pillOptions={filterOptions.genderOptions}
                    selected={selectedGenders}
                    setSelected={setSelectedGenders}
                  />
                </div>
              </div>

              {/* Size Filters */}
              <div
                className='flex flex-col'
              >
                <h1>Select Size</h1>
                <div
                  className='flex flex-wrap'
                >
                  <Pills
                    pillOptions={filterOptions.sizeOptions}
                    selected={selectedSize}
                    setSelected={setSelectedSize}
                  />
                </div>
              </div>

              {/* Select Features */}
              <div
                className='flex flex-col'
              >
                <h1>Select Features</h1>
                <div
                  className='flex flex-wrap'
                >
                  <Pills
                    pillOptions={filterOptions.featureOptions}
                    selected={selectedFeatures}
                    setSelected={setSelectedFeatures}
                  />
                </div>
              </div>

              <button
                className=' border-b items-center justify-center flex mt-4 mx-auto p-1 px-2 rounded-2xl bg-gray-950 cursor-pointer  text-white  content-center'
              >
                <p className='pr-2' >Apply Filters</p>
                <Funnel className='text-white p-0.5' />
              </button>

            </div>
          </div>
        </FilterPopUp>

      </div>

    </div>

  )
}

