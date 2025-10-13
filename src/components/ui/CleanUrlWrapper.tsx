'use client'
import React, {useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function CleanUrlWrapper({children}: {children: React.ReactNode}) {


  const {status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === 'authenticated'){
      router.replace(window.location.pathname)
      // console.log('this is where we are now ',window.location.pathname)
    }
    

  }, [])
  return (
    <div>
      {children}
    </div>
  )
}

export default CleanUrlWrapper
