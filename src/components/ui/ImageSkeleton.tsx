'use client'
import React from 'react'

function ImageSkeleton({ extraClasses }: { extraClasses?: string }) {
  return (
    <div className={`relative h-48 bg-gradient-to-br from-gray-200 to-blue-50 rounded-t-2xl  animate-pulse overflow-hidden ${extraClasses ?? ''}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400/60"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM9 12h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Zm5.697 2.395v-.733l1.269-1.219v2.984l-1.268-1.032Z"
          />
        </svg>
      </div>
    </div>)
}

export default ImageSkeleton
