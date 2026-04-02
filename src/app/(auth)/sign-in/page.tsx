"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Button from '@/components/ui/Button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setError('')
    setLoading(true)
    e.preventDefault()
    console.log('entering in handleSubmit')
    const res = await signIn('admin-login', {
      username,
      password,
      redirect: false,
    })

    if (res?.ok && !res?.error) {
      router.push('/dashboard/home')
    } else {
      setError('Invalid credentials, please try again')
    }

    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <LoadingIcon />
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row w-full min-h-screen'>
          
          {/* Left Side - Hero Section with Background Image (Hidden on mobile, visible on desktop) */}
          <div
            className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/002/037/924/small/abstract-blue-background-with-beautiful-fluid-shapes-free-vector.jpg')"
            }}
          >
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80'></div>
            
            {/* Content */}
            <div className='relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white'>
              <h1 className='text-5xl xl:text-6xl font-bold mb-6 leading-tight'>
                Welcome Back
              </h1>
              
              <p className='text-xl xl:text-2xl text-slate-300 mb-8 leading-relaxed max-w-md'>
                Continue your journey with us. Access your dashboard and manage your store effortlessly.
              </p>
              
              <div className='space-y-4 text-slate-400'>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 rounded-full bg-cyan-400'></div>
                  <p className='text-lg'>Manage products & inventory</p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 rounded-full bg-cyan-400'></div>
                  <p className='text-lg'>Track orders in real-time</p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 rounded-full bg-cyan-400'></div>
                  <p className='text-lg'>Grow your business</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form (Full screen on mobile, half on desktop) */}
          <div className='flex flex-col items-center justify-center w-full lg:w-1/2 xl:w-2/5 px-6 py-12 bg-white relative'>
            
            {/* Mobile Background with overlay */}
            <div 
              className="lg:hidden absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/002/037/924/small/abstract-blue-background-with-beautiful-fluid-shapes-free-vector.jpg')"
              }}
            ></div>

            {/* Form Container */}
            <div className='relative z-10 w-full max-w-md'>
              
              {/* Form Header */}
              <div className='text-center lg:text-left mb-8'>
                <h2 className='text-3xl lg:text-4xl font-bold text-slate-800 mb-2'>
                  Sign In
                </h2>
                <p className='text-slate-600'>
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                  <p className='text-red-600 text-sm font-medium'>{error}</p>
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className='space-y-6'>
                
                {/* Email Input */}
                <div>
                  <label htmlFor='email' className='block text-sm font-semibold text-slate-700 mb-2'>
                    Email Address
                  </label>
                  <input
                    id='email'
                    autoFocus
                    autoComplete='username'
                    placeholder='admin@store.com'
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all'
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor='password' className='block text-sm font-semibold text-slate-700 mb-2'>
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      id='password'
                      autoComplete='current-password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPass ? 'text' : 'password'}
                      required
                      className='w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all pr-12'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPass(prev => !prev)}
                      className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors'
                    >
                      {showPass ? (
                        <EyeOffIcon className='w-5 h-5' />
                      ) : (
                        <EyeIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between text-sm'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input 
                      type='checkbox' 
                      className='w-4 h-4 rounded border-slate-300 text-slate-700 focus:ring-slate-500'
                    />
                    <span className='text-slate-600'>Remember me</span>
                  </label>
                  <a href='#' className='text-slate-700 hover:text-slate-900 font-medium'>
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                >
                  Sign In to Dashboard
                </Button>
              </form>

              {/* Footer */}
              <div className='mt-8 pt-6 border-t border-slate-200 text-center'>
                <p className='text-slate-600 text-sm'>
                  © 2026 Your Store. All rights reserved.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
} 