import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncate = ({text, limit}: {text: string; limit: number}  ) => {
  // const truncatedText: string = text.trim().substring(0, limit).concat('.....')
  let demo =  text.trim().split(' ')
  let final = demo.map((item, idx) => {
    if(idx + 1 <= limit){
      return item
    }
  })
  return final.join(' ').concat('....')
  // return truncatedText

}


export const truncateLetter = ({ text, limit }: { text: string; limit: number }): string => {
  const cleanText = text.trim()
  
  if (cleanText.length <= limit) {
    return cleanText // no need to cut, return as-is
  }
  
  return cleanText.substring(0, limit).trim() + '...'
}