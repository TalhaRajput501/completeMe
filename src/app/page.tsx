'use client'
import Banner from "@/components/ui/Banner";
import Card from "@/components/ui/Card";
import React, { useEffect } from "react"
import { store } from "@/lib/store/store";
import { useAppDispatch } from "@/lib/store/reduxHooks"; 
import { getProductsWithIds } from "@/lib/actions/products.actions";
import { eachCartProduct } from "./product/[category]/[id]/[name]/page";


export default function Home() {

  // const dispatch = useAppDispatch()

  useEffect(() => {
    
  }, [])


  return (
    <>
      <div
        className="   pb-34"
      >


        <div
          className=""
        >

          <Banner />
        </div>

        <div
          className="flex flex-wrap items-center justify-center "
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>



    </>
  )
}
