'use client'
import React, { useEffect, useState } from 'react'
import { SlidersHorizontal, Plus, Funnel, ChevronDown, Trash2, SquarePen, ListRestart, RotateCw, View, Eye } from 'lucide-react'
import Link from 'next/link'
import FilterPopUp from '@/components/ui/FilterPopUp'
import Pills, { Option } from '@/components/ui/Pills'
import UpdateDrawer from '@/components/ui/UpdateDrawer'
import { getProducts } from './actions'
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
    <div
      className={`mx-2  `}
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
              className={`h-9 text-gray-100 bg-gray-800 py-2 text-xl px-3  outline-none shadow-xl  rounded-lg w-full`}
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
                className='rounded bg-green-400 p-2 px-3 w-full  items-center justify-center cursor-pointer flex'
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
                className='rounded bg-green-400 p-2 px-3 w-full  items-center justify-center cursor-pointer flex'
              >
                <SlidersHorizontal className='  h-4 ' />
                <p>Filter</p>
              </button>
            </div>


            <div
              className='mx-2'
              onClick={myProducts}
            >
              <button
                disabled={!reloadEnable}
                className={`rounded bg-[rgb(37,99,235)] p-2 px-3 w-full  items-center justify-center cursor-pointer flex `}
              >
                <RotateCw className=' mr-0.5 h-4 ' />
                <p>Reload</p>
              </button>
            </div>
          </div>
        </div>

        {/* All Products */}

        <div
          className='w-280   md:w-full   overflow-y-auto '
        >
          <table className=' w-full rounded mt-5    text-white '>
            <thead
              className='bg-gray-700'
            >
              <tr
                className='border-b  border-gray-600'
              >
                <th className='text-left  py-2'></th>
                <th className='text-left  py-2 '></th>
                <th className='text-left  py-2'>PRODUCT</th>
                <th className='text-left  py-2'>CATEGORY</th>
                <th className='text-left  py-2'>BRAND</th>
                <th className='text-left  py-2'>PRICE</th>
                <th className='text-left  py-2'>STOCK</th>
                <th className='text-left  py-2'>STATUS</th>
              </tr>
            </thead>

            <tbody>

              {
                products.length !== 0 ? products.map(product => (
                  <React.Fragment key={product._id}>
                    <tr
                      // key={product._id}
                      onClick={() => handleDetailBox(product._id!)}
                      className={`border-b border-gray-600 px-2 duration-300 hover:bg-gray-700 cursor-pointer' ${product._id === currentProductDetailBox ? 'bg-gray-700' : ''}`}
                    >

                      {/* Select checkbox  */}
                      <td
                        className='py-2'
                      >
                        <div
                          className='flex  justify-center'
                        >
                          <input onClick={(e) => e.stopPropagation()} className='bg-gray-600 rounded' type="checkbox" />
                        </div>
                      </td>

                      {/* arrow view detail button */}
                      <td
                        className='py-2'
                      >
                        <div
                          className='flex  justify-center'
                        >
                          <ChevronDown />
                        </div>
                      </td>

                      {/* name and pic of product */}
                      <td
                        className='py-2'
                      >
                        <div
                          className='flex justify- items-center'
                        >
                          <img src={product.images[0]} alt={product.name} draggable={false} className='w-9 h-9  rounded-full mr-1' />
                          <p>{product.name.replaceAll(' ', '-')} </p>
                        </div>
                      </td>
                      <td className='mx-auto text-left text-gray-200 py-2'>{product.category}</td>
                      <td className='mx-auto text-left font-bold py-2'>{product.brand}</td>
                      <td className='mx-auto text-left font-bold py-2'>{product.price}</td>
                      <td className='mx-auto text-left font-bold py-2'>{product.stock}</td>
                      <td className={`mx-auto text-left text-sm font- py-2 `}>
                        {product.isActive ?
                          <p
                            className={`rounded bg-[rgb(1,71,55)] text-[rgb(132,225,188)] w-fit px-1 `}>
                            Active
                          </p>
                          : <p
                            className={`rounded bg-[rgb(119,29,29)] text-[rgb(248,180,180)] w-fit px-1 `}>
                            Inactive
                          </p>
                        }
                        </td>
                    </tr>

                    {/* Product Info Box  */}
                    {
                      product._id === currentProductDetailBox && showProductDetailBox &&
                      <>
                        <tr
                        // key={product.name}
                        >
                          <td
                            colSpan={8}
                          >
                            <div
                              className='flex flex-col'
                            >
                              {/* Products Pictures */}
                              <div
                                className='flex '
                              >
                                {
                                  product.images.map(p => (
                                    <div
                                      key={p}
                                      className='w-[25%] relative    h-48 '
                                    >
                                      <Image
                                        fill
                                        alt={product.name}
                                        className='p-3 rounded-3xl'
                                        // src={'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870'}
                                        src={p}
                                      />
                                    </div>
                                  ))
                                }
                              </div>

                              {/* Product Description and Material*/}
                              <div
                                className='mx-3  '
                              >
                                <div>
                                  <h1 className='font-semibold text-[rgb(37,99,235)] text-xl '>Description</h1>
                                  <p className='text-gray-300'>{product.description}</p>
                                </div>
                                {
                                  product.material &&
                                  <div>
                                    <h1 className='font-semibold text-[rgb(37,99,235)] text-xl '>Material</h1>
                                    <p className='text-gray-300'>{product.material}</p>
                                  </div>
                                }
                              </div>

                              {/* Product Additional Info */}
                              <div
                                className='flex justify-center  items-center flex-wrap'
                              >

                                {/* Features */}
                                {
                                  product.features?.length !== 0 &&
                                  <div
                                    className='bg-gray-800 m-1 basis-[49%] rounded-lg p-1 '
                                  >
                                    <h1 className='  text-xl font-semibold ml-2' >Features</h1>
                                    <p className='flex flex-wrap ' >
                                      {
                                        product.features?.map(p => (
                                          <span
                                            key={p}
                                          >
                                            <Badge className='bg-[rgb(25,55,109)] text-[rgb(186,207,255)]    p-1 m-1 rounded-lg text-auto' >{p}</Badge>
                                          </span>
                                        ))
                                      }
                                    </p>
                                  </div>
                                }

                                {/* Genders */}
                                {
                                  product.gender?.length !== 0 &&
                                  <div
                                    className='bg-gray-800 m-1 basis-[49%] rounded-lg p-1    '
                                  >
                                    <h1 className='  text-xl font-semibold ml-2' >Gender </h1>
                                    <p
                                      className='flex flex-wrap   '
                                    >
                                      {
                                        product.gender?.map(p =>
                                          <span key={p}  >
                                            <Badge className='bg-[rgb(25,55,109)] text-[rgb(186,207,255)]  p-1 m-1 rounded-lg text-auto' >{p}</Badge>
                                          </span>
                                        )
                                      }
                                    </p>
                                  </div>
                                }

                                {/* Size Options */}
                                {
                                  product.sizeOptions?.length !== 0 &&
                                  <div
                                    className='bg-gray-800 m-1 basis-[49%] rounded-lg p-1 '
                                  >
                                    <h1 className='  text-xl font-semibold ml-2' >Size Options</h1>
                                    {
                                      product.sizeOptions?.map(p =>
                                        <span key={p}  >
                                          <Badge className='bg-[rgb(25,55,109)] text-[rgb(179,201,252)] p-1 m-1 rounded-lg  ' >{p}</Badge>
                                        </span>
                                      )
                                    }
                                  </div>
                                }

                                {/* Tags */}
                                <div
                                  className='bg-gray-800 m-1 basis-[49%] rounded-lg p-1 '
                                >
                                  <h1 className='  text-xl font-semibold ml-2' >Tags</h1>
                                  {
                                    product.tags?.map(p =>
                                      <span key={p}  >
                                        <Badge className='bg-[rgb(25,55,109)] text-[rgb(186,207,255)]  p-1 m-1 rounded-lg text-auto' >#{p}</Badge>
                                      </span>
                                    )
                                  }
                                </div>

                              </div>


                              {/* Edit, Delete, Preview Buttons  */}
                              <div className='flex mx-1'>
                                {/* Edit */}
                                <div
                                  className='m-2 mr-1'
                                >
                                  <button className='py-1 px-3 bg-green-500 text-white rounded-lg flex justify-center cursor-pointer hover:bg-[rgb(40,189,40)] items-center'>
                                    <SquarePen className='h-7 w-4 mr-1' />
                                    <span>
                                      Edit
                                    </span>
                                  </button>
                                </div>

                                {/* View */}
                                <div
                                  className='m-1 my-2'
                                >
                                  <Link href={`/product/${product.category}/${product._id}/${product.name.replaceAll(' ', '-')}`}>
                                    <button className='py-1 px-3 bg-gray-600 text-white rounded-lg flex justify-center cursor-pointer hover:bg-gray-700 items-center'>
                                      <Eye className='h-7 w-4 mr-1' />
                                      <span>
                                        View
                                      </span>
                                    </button>
                                  </Link>
                                </div>

                                {/* Delete */}
                                <div
                                  className='my-2 m-1'
                                >
                                  <button className='py-1 px-3 bg-[rgb(225,36,36)] text-white rounded-lg flex justify-center cursor-pointer hover:bg-[rgb(200,40,40)] items-center'>
                                    <Trash2 className='h-7 w-4 mr-1' />
                                    <span>
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      </>
                    }
                  </React.Fragment>
                )) :
                  // Loading until products fetched
                  (
                    <tr>
                      <td colSpan={8}>
                        <div>
                          <Image className='w-16 mt-12 mx-auto ' src={loader} alt="loading..." />
                        </div>
                      </td>
                    </tr>
                  )
              }



            </tbody>
          </table>




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
        </button> */}


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

