import React from 'react'

function Heading({children, extraClassName}:{children: string; extraClassName?:string}) {
  return (
    <h1
      className={`text-xl ${extraClassName}`}
    >{children}</h1>
  )
}

export default Heading