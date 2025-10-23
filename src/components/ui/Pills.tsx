'use client'
import React, { SetStateAction, Dispatch } from 'react'
import { Check, XIcon } from 'lucide-react'

export type Option =  { value: string, label: string }
interface PillProps {
  pillOptions: Option[];
  selected: { value: string, label: string }[];
  setSelected: Dispatch<SetStateAction<Option[]>>;
}

function Pills({ pillOptions, selected, setSelected }: PillProps) {
  return pillOptions.map(option => (

    <div
      key={option.value}
      className={`flex m-1 h-8 cursor-pointer`}
      // onClick={setSelected}
      onClick={() =>
        setSelected(prev =>
          prev.some(p => p.value === option.value) ?
            prev.filter(p => p.value !== option.value) :
            [...prev, option]
        )}
    >
      <div
        className={` rounded-full pl-2 pr-1 border border-gray-900 flex items-center justify-center ${selected.some(opt => opt.value === option.value) ? 'bg-gray-700 text-white ' : 'bg-gray-200 text-black' } `}>

        <p
          className='select-none px-1 '
        >
          {option.value}
        </p>

        <p
          className='  border-gray-900 h-full flex items-center justify-center'
        >
          {
            selected.some(opt => opt.value === option.value) ?
              <Check className='p-0.5  ' />
              :
              <XIcon className='p-0.5  ' />
          }
        </p>

      </div>
    </div>
  ))
}

export default Pills
