import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`bg-[#11283d] rounded cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
