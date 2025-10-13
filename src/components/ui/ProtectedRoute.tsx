'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowed: string[];
}


function ProtectedRoute({ children, allowed = [] }: ProtectedRouteProps) {


  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const { data: session, status } = useSession()
 
  useEffect(() => {
    if (status === 'loading') return setLoading(true)
    if (!session) router.push('/sign-in') 
    else if (!session?.user || !allowed.includes(session.user?.role || '')) router.push('/403')
  }, [router, status, session, allowed])

  // if (status === 'loading') {
  //   console.log('it is running')
  //   return
  // }


  return (
    <div>
      {loading ? <p>Loading</p> : children}
    </div>
  )
}

export default ProtectedRoute
