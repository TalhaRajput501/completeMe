import React, { useEffect, useState } from 'react'

export default function useDebounceValue({ value, delay = 500 }: { value: string, delay: number }) {

  const [debouncedValue, setDebouncedValue] = useState('')
  useEffect(() => {

    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearTimeout(timeout)
    }

  }, [value, delay])

  return debouncedValue
}
