'use client'
import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { eachCartProduct } from '@/app/product/[category]/[id]/[name]/page'

interface CounterProps {
  deleteIcon?: boolean;
  className?: string;
  value: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  currentProduct: string;
  controlToChangeCart?: boolean
}

function QuantityCounter({ deleteIcon, className, value, setQty, currentProduct, controlToChangeCart = false }: CounterProps) {

  const setCartQuantity = (updatedValue: number) => {

    if (controlToChangeCart) {
      const cart = localStorage.getItem('cartProducts')
      if (cart) {
        const jsonCart = JSON.parse(cart)
        const newCart = jsonCart.map((item: eachCartProduct) => {
          if (item.product === currentProduct) {
            return { product: item.product, quantity: updatedValue }
          }
          return item 
        }
        )
        localStorage.setItem('cartProducts', JSON.stringify(newCart))
      }
    }
  }


  return (
    <div
      className='flex justify-center border-[#3dbdf1] border rounded-full items-cetner  '
    >
      {/* Decrement Button */}

      <button onClick={() => {
        setQty(prev => {
          const updated = Math.max(1, prev - 1)
          setCartQuantity(updated);
          return updated
        }
        );
      }
      }
        className={` w-full text-center rounded-l-full cursor-pointer border-r-[#3dbdf1]  font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300  ${className ?? 'px-2 p-1'} `} >
        {
          deleteIcon && value === 1 ? (
            <Trash onClick={() => console.log('now i clicked on trash icon')} className='p-0.5' />
          ) : (
            <Minus className='p-0.5' />
          )
        }
      </button>

      {/* Cart Value */}
      <p className={` w-full text-center text-[#3dbdf1]   font-bold text-xl  bg-gray-200 ${className ?? 'px-2 p-1'}`}>{value}</p>

      {/* Increment Button */}
      <button onClick={() => {
        setQty(prev => {
          const updated = prev >= 5 ? prev : prev + 1
          setCartQuantity(updated);
          return updated

        });
      }
      }
        className={`w-full text-center rounded-r-full cursor-pointer border-l-[#3dbdf1] font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300   ${className ?? 'px-2 p-1'} `}>
        <Plus className='p-0.5' />
      </button>


    </div>
  )
}

export default QuantityCounter
