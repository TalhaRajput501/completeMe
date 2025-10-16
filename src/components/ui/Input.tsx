import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

function Input({  className, type, value, ...rest   }: InputProps) {
  return ( 
      <input
        className={`h-10 bg-white py-1 text-xl rounded px-3  outline-none shadow-xl mx-3 mt-3 ${className}`}
        type={type}
        value={value}
        {...rest}
      /> 
  )
} 

export default Input
