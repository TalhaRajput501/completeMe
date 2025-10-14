'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ProductType, productSchema } from '@/schemas/product.schema'
import { addProduct } from '../actions'
import Input from '@/components/ui/Input'
import Select, { MultiValue } from 'react-select'
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

  // handle change files (pics)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files)
      console.log(newFiles)
      setFile({ selectedFiles: newFiles })
    }
  }

  // SEO TAGS
  const [localTags, setLocalTags] = useState<string>('')

  // MULTI SELECT OPTIONS

  // gender options
  const allGenderOptions: Option[] = [
    { value: 'male', label: 'Male' },
    { value: 'felmale', label: 'Female' },
    { value: 'unisex', label: 'Unisex' },
  ];

  // feature options
  const allFeatureOptions: Option[] = [
    { value: 'male', label: 'Male' },
    { value: 'felmale', label: 'Female' },
    { value: 'unisex', label: 'Unisex' },
  ];

  // size options
  const allSizeOptions: Option[] = [
    { value: 'XS', label: 'Extra Small' },
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medium' },
    { value: 'L', label: 'Large' },
    { value: 'XL', label: 'Extra Large' },
    { value: 'XXL', label: 'Double Extra Large' },
    { value: 'FREE', label: 'Free Size' },
    { value: '6', label: 'Size 6' },
    { value: '7', label: 'Size 7' },
    { value: '8', label: 'Size 8' },
    { value: '9', label: 'Size 9' },
    { value: '10', label: 'Size 10' },
  ];

  const [selectedGenders, setSelectedGenders] = useState<MultiValue<Option>>([])
  const [selectedFeatures, setSelectedFeatures] = useState<MultiValue<Option>>([])
  const [selectedSize, setSelectedSize] = useState<MultiValue<Option>>([])

  const showChoices = () => {
    console.log('this is gender', selectedGenders)
    console.log('this is features', selectedFeatures)
    console.log('this is size', selectedSize)
  }

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
    gender: 'men',
    brand: '',
    features: [],
    material: '',
    sizeOptions: []
  })

  // FORM SUBMIT  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('entering in handle submit')
    setError('')
    e.preventDefault()

    const parsed = productSchema.safeParse({ ...product, tags: localTags.split(',') })

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
          onClick={showChoices}
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
              <input
                value={product.name}
                onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                className='h-10 bg-white py-2 text-2xl px-3 outline-none shadow-xl mx-3 mt-3 '
                name='name'
                placeholder="Product Name"
                required
                type="text"
              />

              {/* Product Pictures */}
              <input
                className=' bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                required
                name='name'
                onChange={handleFileChange}
                type="file"
                multiple
                accept='image/*'
              />

              {/* Product Price */}
              <input
                value={product.price}
                onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                name='price'
                className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                required
                placeholder='Enter the price'
                type='number'
              />

              {/* Product Status */}
              <input
                checked={product.isActive}
                onChange={(e) => setProduct(prev => ({ ...prev, isActive: e.target.checked }))}
                name='isActive'
                className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                required
                type="checkbox"
              />

              {/* Product Stock */}
              <input
                value={product.stock}
                onChange={(e) => setProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                name='stock'
                className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                required
                placeholder='Enter the stock'
                type='number'
              />

              {/* Brand */}
              <Input
                className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                type='text'
                onChange={() => console.log('changed')}
                value={'brand'}
              />

              {/* Material */}
              <Input
                className='h-10 bg-white py-2 text-2xl px-3  outline-none shadow-xl mx-3 mt-3 '
                type='text'
                onChange={() => console.log('changed')}
                value={'material'}
              />

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

              <div
                className='mx-3 mt-3'
              >
                {/* Feature */}
                <Select
                  isMulti
                  instanceId={'feature'}
                  options={allFeatureOptions}
                  value={selectedFeatures}
                  onChange={setSelectedFeatures}
                  placeholder="Select your feature..."
                  className="text-xl"
                />
              </div>

              <div
                className='mx-3 mt-3'
              >
                {/* Size */}
                <Select
                  isMulti
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
            className='border w-full flex flex-col justify-center '
          >
            {/* Product Description */}
            <input
              value={product.description}
              type="text"
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              className='h-10 bg-white mx-3 mt-3  md:mx-auto md:w-[95%] py-2 text-2xl px-3  outline-none shadow-xl p-3 '
              name='description'
              required
              placeholder="Product description"
            />

            {/* Product Tags */}
            <input
              value={localTags}
              type="text"
              onChange={(e) => setLocalTags(e.target.value)}
              className='h-10 bg-white mx-3 mt-3 md:mx-auto md:w-[95%]  py-2 text-2xl px-3  outline-none shadow-xl -3 '
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

