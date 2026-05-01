'use client'
import React from 'react'

function HeadingSkeleton({ width = "w-3/4" }: { width?: string }) {
  return (
    <div className={`h-5 bg-gray-200 rounded-lg  animate-pulse  mb-3 ${width}` }></div>
  )
}

export default HeadingSkeleton