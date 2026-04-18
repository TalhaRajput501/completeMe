import React from 'react'

function Heading({children, extraClassName}:{children: string; extraClassName?:string}) {
  return (
    <h1
      className={`text-3xl md:text-4xl font-bold ${extraClassName}`}
    >{children}</h1>
  )
}

export default Heading