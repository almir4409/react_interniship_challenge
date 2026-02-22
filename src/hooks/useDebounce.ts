import { useState, useEffect } from 'react'

 // works with strings numbers anything generic function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // start timer when value changes
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // if value changes again before timer ends cancel it
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce