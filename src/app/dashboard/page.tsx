'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

export default function Page() {

  const { data: session } = useSession()
  console.log(session)
  return (
    <div>
      <h1
        className='bg-red-500 text-4xl '
      >
        welcome to the dashboard
      </h1>






    </div>
  )
}
 
