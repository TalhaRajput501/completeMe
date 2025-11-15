'use client'
import React from 'react'
import { Badge } from './badge'

interface Props {
  totalStock: number;
  className?: string;
}
function StockStatusPill({totalStock, className} : Props) {


  return (
    <Badge className={`rounded text-sm ${className} ${totalStock > 0 ? 'bg-[rgb(1,71,55)] text-[rgb(132,225,188)] ' : 'bg-[rgb(119,29,29)] text-[rgb(248,180,180)] '} `}>{totalStock > 0 ? 'In Stock' : 'Out of stock'}</Badge>
  )
}

export default StockStatusPill
