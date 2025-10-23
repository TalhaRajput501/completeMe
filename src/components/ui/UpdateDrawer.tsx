'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface UpdateDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void
}

function UpdateDrawer({ children, onClose, isOpen }: UpdateDrawerProps) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])



  if (!mounted) return null
  if (!isOpen) return null 

  const portal = document.getElementById('portal-root')
  if (!portal) return null

  return createPortal(
    <div
      className=' fixed inset-0 w-full h-[calc(100vh-4rem)] bg-red-9000 top-[4rem] z-[61] '
    >
      <div
        className='absolute bg-black/50 backdrop-blur-sm h-full inset-0'
        onClick={onClose}
      />

      <div
        className={`absolute w-[70%] right-0 bg-green-900 h-full delay-5000 transition-all duration-2000 `}
      >
        <button
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    portal
  )
}

export default UpdateDrawer
