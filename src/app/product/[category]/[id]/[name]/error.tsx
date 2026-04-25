'use client';

'use client'
import React from 'react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-red-500 mb-4'>
          Something went wrong!
        </h1>
        <p className='text-gray-600 mb-6'>
          {error.message || 'An error occurred while fetching the product.'}
        </p>
        <button
          onClick={reset}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
        >
          Try again
        </button>
      </div>
    </div>
  );
}