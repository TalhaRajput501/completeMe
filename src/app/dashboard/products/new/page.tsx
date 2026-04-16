'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { ProductType, productSchema } from '@/schemas/product.schema'
import { addProduct } from '@/lib/actions/products.actions'
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select'
import { Boxes, CircleDollarSign, FileImage, PackagePlus, ShieldCheck, Tag, Warehouse } from 'lucide-react'

type SelectOption = {
  value: string
  label: string
}

type CategoryValue = ProductType['category']
type CategoryOption = {
  value: CategoryValue
  label: string
}

const categoryOptions: CategoryOption[] = [
  { value: 'watch', label: 'Watches' },
  { value: 'shoe', label: 'Shoes' },
  { value: 'cloth', label: 'Clothes' },
]

const genderOptions: SelectOption[] = [
  { value: 'men', label: 'Male' },
  { value: 'women', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
]

const featureOptionsByCategory: Record<CategoryValue, SelectOption[]> = {
  watch: [
    { value: 'analog', label: 'Analog Display' },
    { value: 'digital', label: 'Digital Display' },
    { value: 'smart', label: 'Smart Watch' },
    { value: 'waterresistant', label: 'Water Resistant' },
    { value: 'stainlesssteel', label: 'Stainless Steel' },
    { value: 'chronograph', label: 'Chronograph Function' },
    { value: 'leatherstrap', label: 'Leather Strap' },
  ],
  cloth: [
    { value: 'cotton', label: 'Cotton Fabric' },
    { value: 'linen', label: 'Linen Material' },
    { value: 'polyester', label: 'Polyester Blend' },
    { value: 'handmade', label: 'Handmade' },
    { value: 'washable', label: 'Machine Washable' },
    { value: 'casual', label: 'Casual Wear' },
    { value: 'formal', label: 'Formal Wear' },
  ],
  shoe: [
    { value: 'leather', label: 'Leather Material' },
    { value: 'sports', label: 'Sports Type' },
    { value: 'waterproof', label: 'Waterproof' },
    { value: 'lightweight', label: 'Lightweight' },
    { value: 'slipresistant', label: 'Slip Resistant' },
    { value: 'breathable', label: 'Breathable Material' },
    { value: 'cushioned', label: 'Cushioned Sole' },
  ],
}

const sizeOptionsByCategory: Record<CategoryValue, SelectOption[]> = {
  watch: [
    { value: '28mm', label: '28 mm (Small)' },
    { value: '32mm', label: '32 mm (Medium - Women)' },
    { value: '36mm', label: '36 mm (Unisex)' },
    { value: '40mm', label: '40 mm (Standard Men)' },
    { value: '44mm', label: '44 mm (Large Dial)' },
    { value: '46mm', label: '46 mm (Extra Large)' },
  ],
  cloth: [
    { value: 'xs', label: 'XS (Extra Small)' },
    { value: 's', label: 'S (Small)' },
    { value: 'm', label: 'M (Medium)' },
    { value: 'l', label: 'L (Large)' },
    { value: 'xl', label: 'XL (Extra Large)' },
    { value: 'xxl', label: 'XXL (2X Large)' },
  ],
  shoe: [
    { value: '38', label: 'EU 38 / US 6' },
    { value: '39', label: 'EU 39 / US 7' },
    { value: '40', label: 'EU 40 / US 7.5' },
    { value: '41', label: 'EU 41 / US 8' },
    { value: '42', label: 'EU 42 / US 9' },
    { value: '43', label: 'EU 43 / US 10' },
    { value: '44', label: 'EU 44 / US 11' },
  ],
}

const singleSelectStyles: StylesConfig<CategoryOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#94a3b8',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  input: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748b',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f1f5f9' : '#ffffff',
    color: state.isSelected ? '#1d4ed8' : '#0f172a',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#64748b',
  }),
}

const multiSelectStyles: StylesConfig<SelectOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#94a3b8',
    },
  }),
  input: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748b',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#dbeafe',
    borderRadius: 6,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#1d4ed8',
    fontWeight: 600,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#1d4ed8',
    ':hover': {
      backgroundColor: '#bfdbfe',
      color: '#1e40af',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f1f5f9' : '#ffffff',
    color: state.isSelected ? '#1d4ed8' : '#0f172a',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#64748b',
  }),
}

const initialProduct: ProductType = {
  name: '',
  description: '',
  images: [],
  isActive: true,
  price: 0,
  stock: 0,
  tags: [],
  category: 'watch',
  gender: ['men'],
  brand: '',
  features: [],
  material: '',
  sizeOptions: [],
}

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fileInputKey, setFileInputKey] = useState(0)
  const [localTags, setLocalTags] = useState('')

  const [selectedGenders, setSelectedGenders] = useState<MultiValue<SelectOption>>([genderOptions[0]])
  const [selectedFeatures, setSelectedFeatures] = useState<MultiValue<SelectOption>>([])
  const [selectedSize, setSelectedSize] = useState<MultiValue<SelectOption>>([])
  const [category, setCategory] = useState<CategoryOption>(categoryOptions[0])

  const [product, setProduct] = useState<ProductType>(initialProduct)

  const featureOptions = useMemo(() => featureOptionsByCategory[category.value], [category.value])
  const sizeOptions = useMemo(() => sizeOptionsByCategory[category.value], [category.value])

  const parsedTags = useMemo(
    () =>
      localTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [localTags]
  )

  useEffect(() => {
    setSelectedFeatures([])
    setSelectedSize([])
    setProduct((prev) => ({ ...prev, category: category.value }))
  }, [category])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setSelectedFiles(Array.from(event.target.files))
  }

  const resetForm = () => {
    setProduct(initialProduct)
    setLocalTags('')
    setSelectedFiles([])
    setFileInputKey((prev) => prev + 1)
    setCategory(categoryOptions[0])
    setSelectedGenders([genderOptions[0]])
    setSelectedFeatures([])
    setSelectedSize([])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (selectedFiles.length === 0) {
      setError('Please upload at least one product image.')
      return
    }

    const genderValues = selectedGenders.map((g) => g.value as 'men' | 'women' | 'unisex')

    const payload: ProductType = {
      ...product,
      tags: parsedTags,
      category: category.value,
      features: selectedFeatures.map((feature) => feature.value),
      sizeOptions: selectedSize.map((size) => size.value),
      gender: genderValues.length > 0 ? genderValues : ['men'],
    }

    const parsed = productSchema.safeParse(payload)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Please check all fields before submitting.')
      return
    }

    setSubmitting(true)
    try {
      await addProduct(parsed.data, selectedFiles)
      setSuccessMessage('Product added successfully.')
      resetForm()
    } catch {
      setError('Something went wrong while adding the product. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const labelClass = 'text-sm font-semibold text-slate-700'
  const inputClass =
    'mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  const sectionClass = 'rounded-xl border border-slate-200 bg-white p-4 sm:p-5'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Add Product</h1>
        <p className="text-slate-600">
          Create a new item for your catalog with complete details and category-specific options.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Boxes className="h-5 w-5 text-blue-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Product Name
                </label>
                <input
                  id="name"
                  value={product.name}
                  onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                  className={inputClass}
                  required
                  type="text"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <div className="mt-1">
                  <Select
                    inputId="category"
                    instanceId="category"
                    options={categoryOptions}
                    value={category}
                    onChange={(selected: SingleValue<CategoryOption>) => {
                      if (selected) setCategory(selected)
                    }}
                    isClearable={false}
                    styles={singleSelectStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="brand" className={labelClass}>
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  value={product.brand}
                  placeholder="Enter brand name"
                  onChange={(e) => setProduct((prev) => ({ ...prev, brand: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="material" className={labelClass}>
                  Material
                </label>
                <input
                  id="material"
                  type="text"
                  value={product.material}
                  placeholder="Enter product material"
                  onChange={(e) => setProduct((prev) => ({ ...prev, material: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
              Pricing and Stock
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price
                </label>
                <input
                  id="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct((prev) => ({ ...prev, price: Number(e.target.value) }))
                  }
                  className={inputClass}
                  required
                  placeholder="Enter product price"
                  type="number"
                  min={0}
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="stock" className={labelClass}>
                  Stock
                </label>
                <input
                  id="stock"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct((prev) => ({ ...prev, stock: Number(e.target.value) }))
                  }
                  className={inputClass}
                  required
                  placeholder="Enter available stock"
                  type="number"
                  min={0}
                />
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileImage className="h-5 w-5 text-blue-600" />
              Product Media
            </h2>

            <label htmlFor="images" className={labelClass}>
              Upload Images
            </label>
            <input
              key={fileInputKey}
              id="images"
              required
              onChange={handleFileChange}
              type="file"
              multiple
              accept="image/*"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-2 text-sm text-slate-500">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} image(s) selected`
                : 'Select one or more product images'}
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-blue-600" />
              Product Attributes
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>
                <div className="mt-1">
                  <Select
                    inputId="gender"
                    instanceId="gender"
                    isMulti
                    options={genderOptions}
                    value={selectedGenders}
                    onChange={(selected: MultiValue<SelectOption>) => setSelectedGenders(selected)}
                    placeholder="Select gender"
                    styles={multiSelectStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="features" className={labelClass}>
                  Features
                </label>
                <div className="mt-1">
                  <Select
                    inputId="features"
                    instanceId="features"
                    isMulti
                    options={featureOptions}
                    value={selectedFeatures}
                    onChange={(selected: MultiValue<SelectOption>) => setSelectedFeatures(selected)}
                    placeholder="Select product features"
                    styles={multiSelectStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sizeOptions" className={labelClass}>
                  Size Options
                </label>
                <div className="mt-1">
                  <Select
                    inputId="sizeOptions"
                    instanceId="sizeOptions"
                    isMulti
                    options={sizeOptions}
                    value={selectedSize}
                    onChange={(selected: MultiValue<SelectOption>) => setSelectedSize(selected)}
                    placeholder="Select available sizes"
                    styles={multiSelectStyles}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-600" />
              Description and SEO Tags
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  value={product.description}
                  onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-1 min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Write a product description..."
                />
              </div>

              <div>
                <label htmlFor="tags" className={labelClass}>
                  SEO Tags (comma separated)
                </label>
                <input
                  id="tags"
                  value={localTags}
                  type="text"
                  onChange={(e) => setLocalTags(e.target.value)}
                  className={inputClass}
                  required
                  placeholder="watch, premium, leather, men"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 xl:sticky xl:top-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <PackagePlus className="h-5 w-5 text-blue-600" />
              Product Preview
            </h2>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
              <h3 className="text-base font-semibold text-slate-800">
                {product.name || 'Untitled product'}
              </h3>
              <p className="text-sm text-slate-600">{category.label}</p>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md bg-white border border-slate-200 px-3 py-2">
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="font-semibold text-slate-800">${product.price || 0}</p>
                </div>
                <div className="rounded-md bg-white border border-slate-200 px-3 py-2">
                  <p className="text-xs text-slate-500">Stock</p>
                  <p className="font-semibold text-slate-800">{product.stock}</p>
                </div>
              </div>

              <div className="rounded-md bg-white border border-slate-200 px-3 py-2">
                <p className="text-xs text-slate-500">Status</p>
                <p className={`font-semibold ${product.isActive ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {product.isActive ? 'Published' : 'Draft'}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {parsedTags.length > 0 ? (
                    parsedTags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">No tags added yet</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Images</p>
                {selectedFiles.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedFiles.slice(0, 4).map((file) => (
                      <li key={file.name} className="text-xs text-slate-600 truncate">
                        • {file.name}
                      </li>
                    ))}
                    {selectedFiles.length > 4 && (
                      <li className="text-xs text-slate-500">+ {selectedFiles.length - 4} more</li>
                    )}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500">No images selected</p>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Publishing note
              </p>
              <p>Use Draft to save product details first, then switch to Publish when ready.</p>

              <div className="mt-4 rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-800 mb-2">Publishing</p>
                <div className="space-y-2 text-sm text-slate-700 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isActive"
                      value="true"
                      checked={product.isActive === true}
                      onChange={() => setProduct((prev) => ({ ...prev, isActive: true }))}
                      className="text-blue-600"
                    />
                    Publish now
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isActive"
                      value="false"
                      checked={product.isActive === false}
                      onChange={() => setProduct((prev) => ({ ...prev, isActive: false }))}
                      className="text-blue-600"
                    />
                    Save as draft
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? 'Saving Product...' : 'Add Product'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}
