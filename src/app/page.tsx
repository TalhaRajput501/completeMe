'use client'
import Banner from "@/components/ui/Banner";
import Card from "@/components/ui/Card";
import React, {useEffect} from "react"


export default function Home() {
 

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
