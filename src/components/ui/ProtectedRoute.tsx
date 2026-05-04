'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowed: string[];
}


function ProtectedRoute({ children, allowed = [] }: ProtectedRouteProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/sign-in') 
    else if (!session?.user || !allowed.includes(session.user?.role || '')) router.push('/403')
  }, [router, status, session, allowed])

  // if (status === 'loading') {
  //   console.log('it is running')
  //   return
  // }


  return (
    <div>
      {isLoading ? (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4'>
          <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
              <ShieldCheck className='h-6 w-6' />
            </div>
            <div className='mx-auto mb-4 h-8 w-8 rounded-full border-4 border-blue-600 border-b-transparent animate-spin' />
            <h2 className='text-lg font-semibold text-slate-800'>Checking access</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Please wait while we verify your session and permissions.
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default ProtectedRoute
