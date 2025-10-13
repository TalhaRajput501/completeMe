import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}

function Input({  className, type, value, ...rest   }: InputProps) {
  return ( 
      <input
        className={`${className}`}
        type={type}
        value={value}
        {...rest}
      /> 
  )
} 

export default Input
