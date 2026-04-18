import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`  bg-[#0d91c5]  rounded  p-1.5 px-4 text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
