import { useEffect } from 'react'

export default function useWarnClone() {
  useEffect(() => {
    alert(
      'Please note this is a clone site built for learning purpose. This is NOT the real LinkedIn site.'
    )
  }, [])
}
