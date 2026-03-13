"use client"
import React, { useState, } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Button from '@/components/ui/Button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

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

    // console.log('this is backend response ', res)
    if (res?.ok && !res?.error) {
      router.push('/dashboard/home')
    } else {
      setError('Invalid credentils, please try again ')
    }

    setLoading(false)

  }


  return (
    <div className='flex items-center justify-center w-full h-full '>
      {
        loading ? (
          <LoadingIcon />
        ) : (
          <div
            className='border flex w-258 mx-auto h-123 rounded items-cetner justify-center'
          >

            {/* Abstract background pic & welcome text */}
            <div
              className='    w-1/2'
            >

              <div
                className="bg-[url('https://static.vecteezy.com/system/resources/thumbnails/002/037/924/small/abstract-blue-background-with-beautiful-fluid-shapes-free-vector.jpg')]  bg-center bg-no-repeat bg-cover rounded flex justify-center h-full relative inset-0 "
              >
                <div className='  before:absolute before:inset-0 before:bg-black/10 '></div>
                <div className=' z-10 relative flex flex-col items-center justify-center'>
                  <h1 className='font-bold text-2xl  bg-[#3dbdf1] px-1 '>Welcome back</h1>
                  <p className='font-semibold text-md text-[#11283d]  '>Contine with your credentials </p>
                </div>
              </div>

            </div>


            {/* Sign In form */}
            <form
              className='border flex flex-col items-center justify-center w-1/2'
              onSubmit={handleSubmit}
            >

              <h2 className='font-bold  text-left text-4xl text-[#11283d] '>Sign In</h2>
              <p
                className='text-red-500 font-xl mt-4'
              >
                {error}
              </p>

              <label
                className='bg-[#e8f0fe] flex flex-col  justify-center text-[#11283d] py-1 mt-4 px-2  text-xl w-[60%] focus:border-2 focus:border-black'
              >
                <p className='text-sm font-bold' >Email</p>
                <input
                  autoFocus
                  autoComplete='username'
                  placeholder='mail@mail.com'
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  className='outline-none w-full mt-0.5'
                />
              </label>

              <label
                className='bg-[#e8f0fe]  text-[#11283d] py-1 mt-4  px-2 text-xl w-[60%]'
              >
                <label className='text-sm font-bold' htmlFor="username">Password</label>
                <div className='flex flex-row items-center justify-center'>
                  <input
                    autoComplete='current-password'
                    placeholder='*******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? 'text' : 'password'}
                    className='outline-none  w-full mt-0.5'
                  />
                  {
                    showPass ? (
                      <EyeOffIcon onClick={() => setShowPass(prev => !prev)} className='cursor-pointer' />
                    ) : (
                      <EyeIcon onClick={() => setShowPass(prev => !prev)} className='cursor-pointer' />
                    )
                  }
                </div>
              </label>


              <Button
                className=' text-white py-1.5 my-4  px-4 text-xl'
                type='submit'
              >
                LogIn
              </Button>
            </form>

          </div>

        )
      }



    </div>
  )
} 