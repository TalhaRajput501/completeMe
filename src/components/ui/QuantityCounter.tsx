'use client'
import React, { useState } from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { eachCartProduct } from '@/app/product/[category]/[id]/[name]/page'
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks';
import { deleteItem, updateQuantity } from '@/lib/features/cartSlice';

interface CounterProps {
  value: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  productPrice: number;
  currentProductId: string;
  deleteIcon?: boolean;
  className?: string;
  controlToChangeCart?: boolean
}


function QuantityCounter({ deleteIcon, className, value, setQty, currentProductId, controlToChangeCart = false, productPrice }: CounterProps) {


  const [disableBtn, setDisableBtn] = useState(false)
  // const reduxCart = useAppSelector(state => state.cart.products)
  const dispatch = useAppDispatch()


  const setCartQuantity = (updatedValue: number) => {
    if (controlToChangeCart) {
      dispatch(updateQuantity({ currentProductId, updatedValue }))
    }
  }


  // now build a for this function in cart slice
  const deleteCartItem = (productId: string) => {
    dispatch(deleteItem(productId))
  }


  return (
    <div
      className='flex justify-center border-[#3dbdf1] border rounded-full items-cetner  '
    >
      {/* Decrement Button */}

      <button onClick={() => {
        setQty(prev => {
          prev <= 5 ? setDisableBtn(false) : setDisableBtn(true)
          const updated = Math.max(1, prev - 1)
          setCartQuantity(updated);
          return updated
        }); 
      }
      }
        className={` w-full text-center rounded-l-full cursor-pointer border-r-[#3dbdf1]  font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300  ${className ?? 'px-2 p-1'} `} >
        {
          deleteIcon && value === 1 ? (
            <Trash onClick={() => deleteCartItem(currentProductId)} className='p-0.5' />
          ) : (
            <Minus className='p-0.5' />
          )
        }
      </button>

      {/* Cart Value */}
      <p className={` w-full text-center text-[#3dbdf1]   font-bold text-xl  bg-gray-200 ${className ?? 'px-2 p-1'}`}>{value}</p>

      {/* Increment Button */}
      <button
        onClick={() => {
          setQty(prev => {
            prev >= 4 ? setDisableBtn(true) : setDisableBtn(false)
            const updated = prev >= 5 ? prev : prev + 1
            setCartQuantity(updated);
            return updated
          }); 
        }
        }
        disabled={disableBtn}
        className={`w-full text-center rounded-r-full cursor-pointer border-l-[#3dbdf1] font-bold text-xl border disabled:bg-gray-300 disabled:cursor-default bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300   ${className ?? 'px-2 p-1'} `}>
        <Plus className='p-0.5' />
      </button>


    </div>
  )
}

export default QuantityCounter
