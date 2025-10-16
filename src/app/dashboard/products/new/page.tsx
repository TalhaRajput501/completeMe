'use client'
import React, { useEffect, FormEvent, useState } from 'react'
import { ProductType, productSchema } from '@/schemas/product.schema'
import { addProduct } from '../actions'
import Input from '@/components/ui/Input'
import Select, { MultiValue, SingleValue } from 'react-select'
import MultiSelect from '@/components/ui/MultiSelect'
import { Option } from '@/components/ui/MultiSelect'



export default function Page() {


  // ERRORS
  const [error, setError] = useState<string | null>(null)


  // FILES (pics)
  interface FileState {
    selectedFiles: File[]
  }
  const [file, setFile] = useState<FileState>({
    selectedFiles: []
  })

  // SEO TAGS
  const [localTags, setLocalTags] = useState<string>('')

  // ALL OPTIONS OF SELECT ELEMENTS

  const allGenderOptions: Option[] = [
    { value: 'men', label: 'Male' },
    { value: 'women', label: 'Female' },
    { value: 'unisex', label: 'Unisex' },
  ];

  const [allFeatureOptions, setAllFeatureOptions] = useState<Option[]>([
    { value: "analog", label: "Analog Display" },
    { value: "digital", label: "Digital Display" },
    { value: "smart", label: "Smart Watch" },
    { value: "waterresistant", label: "Water Resistant" },
    { value: "stainlesssteel", label: "Stainless Steel" },
    { value: "chronograph", label: "Chronograph Function" },
    { value: "leatherstrap", label: "Leather Strap" },
  ])

  const [allSizeOptions, setAllSizeOptions] = useState<Option[]>([
    { value: "28mm", label: "28 mm (Small)" },
    { value: "32mm", label: "32 mm (Medium - Women)" },
    { value: "36mm", label: "36 mm (Unisex)" },
    { value: "40mm", label: "40 mm (Standard Men’s)" },
    { value: "44mm", label: "44 mm (Large Dial)" },
    { value: "46mm", label: "46 mm (Extra Large)" },
  ]);
  // it is sigle value
  const categoryOptions: Option[] = [
    { value: 'watch', label: 'Watches' },
    { value: 'shoe', label: 'Shoes' },
    { value: 'cloth', label: 'Clothes' },
  ];

  // ALL SELECTED OPTIONS
  const [selectedGenders, setSelectedGenders] = useState<MultiValue<Option>>([])
  const [selectedFeatures, setSelectedFeatures] = useState<MultiValue<Option>>([])
  const [selectedSize, setSelectedSize] = useState<MultiValue<Option>>([])
  // it is sigle value
  const [category, setCategory] = useState<Option | null>(categoryOptions[0])


  // --> PRODUCT <-- 
  const [product, setProduct] = useState<ProductType>({
    name: '',
    description: '',
    images: [],
    isActive: true,
    price: 0,
    stock: 0,
    tags: [],
    category: 'watch',
    // optional fields
    gender: ['men'],
    brand: '',
    features: [],
    material: '',
    sizeOptions: []
  })


  useEffect(() => {
    // FEATURES
    const clothFeatures = [
      { value: "cotton", label: "Cotton Fabric" },
      { value: "linen", label: "Linen Material" },
      { value: "polyester", label: "Polyester Blend" },
      { value: "handmade", label: "Handmade" },
      { value: "washable", label: "Machine Washable" },
      { value: "casual", label: "Casual Wear" },
      { value: "formal", label: "Formal Wear" }
    ];

    const shoeFeatures = [
      { value: "leather", label: "Leather Material" },
      { value: "sports", label: "Sports Type" },
      { value: "waterproof", label: "Waterproof" },
      { value: "lightweight", label: "Lightweight" },
      { value: "slipresistant", label: "Slip Resistant" },
      { value: "breathable", label: "Breathable Material" },
      { value: "cushioned", label: "Cushioned Sole" },
    ];

    // SIZES
    const shoeSizes = [
      { value: "38", label: "EU 38 / US 6" },
      { value: "39", label: "EU 39 / US 7" },
      { value: "40", label: "EU 40 / US 7.5" },
      { value: "41", label: "EU 41 / US 8" },
      { value: "42", label: "EU 42 / US 9" },
      { value: "43", label: "EU 43 / US 10" },
      { value: "44", label: "EU 44 / US 11" },
    ];

    const clothSizes = [
      { value: "xs", label: "XS (Extra Small)" },
      { value: "s", label: "S (Small)" },
      { value: "m", label: "M (Medium)" },
      { value: "l", label: "L (Large)" },
      { value: "xl", label: "XL (Extra Large)" },
      { value: "xxl", label: "XXL (2X Large)" },
    ];

    if (category?.value === 'cloth') {
      setAllFeatureOptions(clothFeatures)
      setAllSizeOptions(clothSizes)
    } else if (category?.value === 'shoe') {
      setAllFeatureOptions(shoeFeatures)
      setAllSizeOptions(shoeSizes)
    }

  }, [category])


  // handle change files (pics)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files)
      console.log(newFiles)
      setFile({ selectedFiles: newFiles })
    }
  }

  // FORM SUBMIT  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('entering in handle submit')
    setError('')
    e.preventDefault()

    const parsed = productSchema.safeParse(
      {
        ...product,
        tags: localTags.split(','),
        category: category?.value || 'watch',
        features: selectedFeatures.map(res => (res.value)),
        sizeOptions: selectedSize.map(res => (res.value)),
        gender: selectedGenders.map(res => (res.value)),
      }
    )
    console.log({
      ...product,
      tags: localTags.split(','),
      category: category?.value || 'watch',
      features: selectedFeatures.map(res => (res.value)),
      sizeOptions: selectedSize.map(res => (res.value)),
      gender: selectedGenders.map(res => (res.value)),
    })

    if (!parsed.success) {
      const message = parsed.error.issues.map(e => e.message)
      setError(message[0])
      return
    }
    else {
      console.log('this is the final data going to backend ', parsed.data, ' and files ', file.selectedFiles)
      await addProduct(parsed.data, file.selectedFiles)
    }

  }



  return (
    <div>

      <div
        className='p-2 px-4'
      >

        <button
          onClick={() => console.log(category)}
          className='border bg-green-400 p-2 px-4 mx-1 cursor-pointer'
        >
          Add Product
        </button>


        <h1
          className='text-4xl font-bold text-red-500 text-center mt-4 '
        >Add Product</h1>


        <form
          className='mt-5 flex flex-col justify-center  items-center border-2 border-amber-600 '
          onSubmit={handleSubmit}
        >

          {/* Error will show here */}
          {
            error && <p
              className='text-xl text-red-600'
            >
              {error}
            </p>
          }

          {/* upper form and card */}
          <div
            className='w-full md:w-[95%] flex flex-col md:flex-row items-center justify-center'
          >


            {/* This is upper form */}
            <div
              className=' flex flex-col w-full md:w-4/6 order-2 md:order-1 '
            >

              {/* Product name */}
              <Input
                value={product.name}
                onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                name='name'
                placeholder="Product Name"
                required
                type="text"
              />

              {/* Product Pictures */}
              <Input
                required
                name='name'
                onChange={handleFileChange}
                type="file"
                multiple
                accept='image/*'
              />

              {/* Product Price */}
              <Input
                value={product.price}
                onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                name='price'
                required
                placeholder='Enter the price'
                type='number'
              />

              {/* <Input
                checked={product.isActive}
                onChange={(e) => setProduct(prev => ({ ...prev, isActive: e.target.checked }))}
                name='isActive'
                required
                type="checkbox"
              /> */}

              {/* Product Status */}
              <div
                className=' h-10 bg-white py-1 text-xl rounded px-3  outline-none shadow-xl mx-3 mt-3 '
              >
                <label>
                  <input
                    type="radio"
                    name="isActive"
                    value="true"
                    checked={product.isActive === true}
                    onChange={() => setProduct(prev => ({ ...prev, isActive: true }))}
                  />
                  Publish
                </label>

                <label
                  className='ml-3'
                >
                  <input
                    type="radio"
                    name="isActive"
                    value="false"
                    checked={product.isActive === false}
                    onChange={() => setProduct(prev => ({ ...prev, isActive: false }))}
                  />
                  Draft
                </label>

              </div>

              {/* Product Stock */}
              <Input
                value={product.stock}
                onChange={(e) => setProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                name='stock'
                required
                placeholder='Enter the stock'
                type='number'
              />

              {/* Brand */}
              <Input
                type='text'
                value={product.brand}
                placeholder='Enter the brand name'
                onChange={(e) => setProduct(prev => ({ ...prev, brand: e.target.value }))}
              />

              {/* Material */}
              <Input
                type='text'
                value={product.material}
                placeholder='Material of the product'
                onChange={(e) => setProduct(prev => ({ ...prev, material: e.target.value }))}
              />

              {/* Category */}
              <div
                className='mx-3 mt-3'
              >
                <Select
                  instanceId={'category'}
                  options={categoryOptions}
                  // defaultValue={categoryOptions[0]}
                  value={category}
                  onChange={(selected: SingleValue<Option>) => setCategory(selected)}
                  placeholder="Select your category..."
                  className="text-xl"
                />
              </div>

              {/* Gender */}
              <div
                className='mx-3 mt-3'
              >
                <MultiSelect
                  instanceId={'gender'}
                  options={allGenderOptions}
                  value={selectedGenders}
                  onChange={setSelectedGenders}
                  placeholder="Select your gender..."
                  className="text-xl"
                />
              </div>

              {/* Feature */}
              <div
                className='mx-3 mt-3'
              >
                <MultiSelect
                  instanceId={'feature'}
                  options={allFeatureOptions}
                  value={selectedFeatures}
                  onChange={setSelectedFeatures}
                  placeholder="Select your feature..."
                  className="text-xl"
                />
              </div>

              {/* Size */}
              <div
                className='mx-3 mt-3'
              >
                <MultiSelect
                  instanceId={'size'}
                  options={allSizeOptions}
                  value={selectedSize}
                  onChange={setSelectedSize}
                  placeholder="Select your size..."
                  className="text-xl"
                />
              </div>


            </div>


            {/* this is card */}
            <div
              className='border md:flex-1  order-1 md:order-2 '
            >
              <h1
                className='text-3xl font-bold text-green-500 text-center mt-4'
              >Product Card</h1>

              <div>
                <h1
                  className='text-2xl font-bold text-green-500 text-center mt-4'
                >
                  {product.name}
                </h1>


                <h1
                  className='text-2xl font-bold text-green-500 text-center mt-4'
                >
                  {product.price}
                </h1>


                <h1
                  className='text-2xl font-bold text-green-500 text-center mt-4'
                >
                  {product.stock}
                </h1>


                <h1
                  className='text-2xl font-bold text-green-500 text-center mt-4'
                >
                  {product.description}
                </h1>


                <h1
                  className='text-2xl font-bold text-green-500 text-center mt-4'
                >
                  {product.tags}
                </h1>


              </div>

            </div>


          </div>


          {/* This is the lower form  */}
          <div
            className='  w-full md:w-[95%] flex flex-col justify-center '
          >
            {/* Product Description */}
            <Input
              value={product.description}
              type="text"
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              name='description'
              required
              placeholder="Product description"
            />

            {/* Product Tags */}
            <Input
              value={localTags}
              type="text"
              onChange={(e) => setLocalTags(e.target.value)}
              name='tags'
              required
              placeholder="Enter comma seperated tags for SEO"
            />
          </div>

          <button
            type='submit'
            className='border bg-green-400 p-2 px-4 mx-1 cursor-pointer'
          >
            Add Product
          </button>

        </form>



      </div >


    </div >
  )
}

