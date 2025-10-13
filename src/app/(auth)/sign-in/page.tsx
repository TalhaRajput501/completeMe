"use client"
import React, { useState, } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoadingIcon from '@/components/ui/LoadingIcon'

function page() {
  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (e: React.FormEvent) => {
    setError('')
    setLoading(true)
    e.preventDefault()
    console.log('entering in handleSubmit')
    const res = await signIn('admin-login', {
      redirect: false,
      username,
      password,
    })

    // console.log('this is backend response ', res)
    if (res?.ok && !res?.error) {
      router.push('/dashboard')  
    } else {
      setError('Invalid credentils, please try again ')
    }

    setLoading(false)

  }


  return (
    <div>
      {
        loading ? (
          <LoadingIcon />
        ) : (
          <div>
            <p
              className='text-red-500 font-xl '
            >
              {error}
            </p>
            <form onSubmit={handleSubmit}>


              <input
                autoFocus
                autoComplete='username'
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className='bg-gray-500 my-4 mx-4 text-white py-2 text-xl'
              />


              <input
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className='mx-4 bg-gray-500  my-4 text-white py-2 text-xl'
              />


              <button
                type='submit'
                className='bg-green-800 cursor-pointer text-white py-2 my-4  px-4 text-xl'
              >
                submit
              </button>
            </form>
          </div>

        )
      }



    </div>
  )
}

export default page