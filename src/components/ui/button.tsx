import React from 'react'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <div>
      <button 
        className={`  bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded  ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
