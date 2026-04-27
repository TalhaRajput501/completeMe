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
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />
      {/* content */}
      <div className="relative w-[92%] sm:w-[88%] md:w-[72%] lg:w-[56%] xl:w-[44%] max-h-[86vh] h-auto overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
        
        {/* cross button on popup */}
        <div
          onClick={onClose}
          className='absolute right-4 top-4'
        >
          <button
            className='rounded-full border border-slate-300 bg-white p-1 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
            aria-label='Close filters'
          >
            <XIcon className='h-5 w-5' />
          </button>
        </div>

        
        {children}

      </div>

    </div>, 
    portalPort
  )
}

export default FilterPopUp
