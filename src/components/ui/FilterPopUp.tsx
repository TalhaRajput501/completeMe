'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from 'lucide-react'

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function FilterPopUp({ children, onClose, isOpen }: PopUpProps) {

  const [mounted, setMounted] = useState(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;
  if (!isOpen) return null;

  const portalPort = document.getElementById('portal-root')
  if (!portalPort) return null;


  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {/* background overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0  bg-black/60 backdrop-blur-sm"
      />
      {/* content */}
      <div className="relative   overflow-y-auto  bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 h-[70%] md:h-[70%] w-[90%] md:max-w-[40%] ">  
        
        {/* cross button on popup */}
        <div
          onClick={onClose}
          className='absolute right-4 top-4   ' 
        >
          <button
            className=' bg-gray-900 text-white p-0.5 rounded-full flex cursor-pointer '
          >
            <XIcon />
          </button>
        </div>

        
        {children}

      </div>

    </div>, 
    portalPort
  )
}

export default FilterPopUp
