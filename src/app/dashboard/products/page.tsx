'use client'
import React, { useEffect, useState } from 'react'
import { SlidersHorizontal, Plus, Funnel } from 'lucide-react'
import Link from 'next/link'
import FilterPopUp from '@/components/ui/FilterPopUp'
import Pills, { Option } from '@/components/ui/Pills'
import UpdateDrawer from '@/components/ui/UpdateDrawer'
import { getProducts } from './actions'
import { ProductType } from '@/schemas/product.schema'


function page() {

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


  const [showFilterBox, setShowFilterBox] = useState(false)
  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false)

  const [products, setProducts] = useState<ProductType[]>([])

  const myProducts = async () => { 
    console.log('entering in the my products section')
    
    try {
      const allProducts = await getProducts()
      // setProducts(allProducts ?? [])
      console.log(typeof allProducts)
      console.log(allProducts)
    } catch (error) {
      console.log('error in frontend in get all products ',error) 
    }
  }
  useEffect(() => {

    myProducts()
  }, [])


  return (
    <div
      className={`mx-5  `}
    >
      {/* This is the main div */}
      <div
        className=' '
      >

        {/* Heading  */}
        <h1
          className='pt-4 text-center text-white text-4xl '
        >
          My Stock
        </h1>

        {/* Search and Buttons */}
        <div
          className=' mt-4 flex   '
        >
          {/* Search Products Input  */}
          <div
            className='flex-1 flex   justify-center items-center'
          >
            <input
              // onClick={() => setInputClicked(prev => !prev)}
              className={`h-9 bg-white py-2 text-xl px-3  outline-none shadow-xl  rounded-lg w-full`}
              placeholder="Search products..."
              type="text"
              autoFocus
            />
          </div>



          {/* Buttons of add and others */}
          <div
            className='  flex mx-3'
          >
            <Link
              className='mx-2'
              href={'/dashboard/products/new'}
            >
              <button
                className='rounded bg-green-400 p-2 px-4 w-full  items-center justify-center cursor-pointer flex'
              >
                <Plus className='   h-4' />
                <p>Add Product</p>
              </button>
            </Link>


            <div
              className='mx-2'
              onClick={() => setShowFilterBox(true)}
            >
              <button
                className='rounded bg-green-400 p-2 px-4 w-full  items-center justify-center cursor-pointer flex'
              >
                <SlidersHorizontal className='  h-4 ' />
                <p>Filter</p>
              </button>
            </div>
          </div>
        </div>

        {/* All Products */}

        <div>
          <table className='w-full mt-5 text-white '>
            <thead>
              <tr>
                <th className='border'>Image</th>
                <th className='border'>name</th>
                <th className='border'>description</th>
                <th className='border'>price</th>
                <th className='border'>Open</th>
                <th className='border'>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='border'>Image</td>
                <td className='border'>Talha</td>
                <td className='border'>Will be a billionaire Inshallah</td>
                <td className='border'>smile</td>
                <td className='border'>Disabled</td>
                <td className='border'><button onClick={() => setShowUpdateDrawer(true)} className='bg-blue-500 rounded cursor-pointer'>Update</button></td>
              </tr>
            </tbody>
          </table>




        </div>



        <button
          onClick={() => console.log(products)}
          className='bg-red-400 px-3 py-1 text-white'
        >
          show Product
        </button>

        <button
          onClick={() => myProducts()}
          className='bg-red-400 m-5 px-3 py-1 text-white'
        >
          again call function
        </button>







      </div>


      {/* This is the Update Drawr */}
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
                className='border items-center justify-center flex mt-4 mx-auto p-1 px-2 rounded-2xl bg-gray-950 cursor-pointer  text-white  content-center'
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

export default page
