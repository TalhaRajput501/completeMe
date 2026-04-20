'use client'
import React from 'react'

function ParaSkeleton() {
  return (
    <div className="space-y-2 mb-4  animate-pulse">
      <div className="h-3 bg-gray-200 rounded-full w-full"></div>
      <div className="h-3 bg-gray-200 rounded-full w-10/12"></div>
      <div className="h-3 bg-gray-200 rounded-full w-8/12"></div>
    </div>)
}

export default ParaSkeleton