'use client'
import React, { SetStateAction, Dispatch } from 'react'
import { Check, XIcon } from 'lucide-react'
import { CategoryOption, featureOptionsByCategory, SelectOption, sizeOptionsByCategory } from '../../../types/productStyle';

// export type Option =  { value: string, label: string }
interface PillProps {
  pillOptions: CategoryOption[];
  selected: CategoryOption;
  setSelected: Dispatch<SetStateAction<CategoryOption>>;
  setSelectedFeatures: Dispatch<SetStateAction<SelectOption[]>>;
  setSelectedSize: Dispatch<SetStateAction<SelectOption[]>>;
}

function CategoryPills({ pillOptions, selected, setSelected, setSelectedFeatures, setSelectedSize }: PillProps) {
  return pillOptions.map(option => (

    <div
      key={option.value}
      className={`flex m-1 h-8 cursor-pointer`}
      // onClick={setSelected}
      onClick={() => { 
        // setSelected(prev =>
        //   prev.some(p => p.value === option.value) ?
        //     prev.filter(p => p.value !== option.value) :
        //     [...prev, option]
        // )

        setSelected(option)
        // Here i want that if i change the category the other categories selected options should vanish and set to default of that category
        setSelectedFeatures(option.value === selected.value ? featureOptionsByCategory[option.value] : [])
        setSelectedSize(option.value === selected.value ? sizeOptionsByCategory[option.value] : [])
      }
      }
    >
      <div
        className={` rounded-full pl-2 pr-1 border border-gray-900 flex items-center justify-center ${selected.value === option.value ? 'bg-gray-700 text-white ' : 'bg-gray-200 text-black'} `}>

        <p
          className='select-none px-1 '
        >
          {option.label}
        </p>

        <p
          className='  border-gray-900 h-full flex items-center justify-center'
        >
          {
            selected.value === option.value ?
              <Check className='p-0.5  ' />
              :
              <XIcon className='p-0.5  ' />
          }
        </p>

      </div>
    </div>
  ))
}

export default CategoryPills
