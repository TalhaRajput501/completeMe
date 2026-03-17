import Banner from '@/components/ui/Banner'
import { ProductCard } from '@/components/ui/ProductsCards'
import ShoeSection from '@/components/ui/ShoeSection'
import React from 'react'

function HomePage() {
  return ( 
    <div
        className="    pb-34"
      >
        <Banner />
        <ProductCard />  
        <ShoeSection />

      </div>
  )
}

export default HomePage