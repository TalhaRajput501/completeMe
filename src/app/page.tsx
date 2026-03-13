'use client'
import Banner from "@/components/ui/Banner";
import Card from "@/components/ui/Card";
import React, { useEffect } from "react"
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";



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

          <div className="mt-5">

          <Heading>
            This is custom component
          </Heading>
          <Button >Click Me</Button>

          </div>
        </div>

      </div>


    </>
  )
}
