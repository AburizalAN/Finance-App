import { useState, useEffect, useCallback, useRef } from 'react'

export const parseCurrency = (nmbr: number) => {
  return new Intl.NumberFormat('id').format(nmbr)
}

export const useStateCallback = (initialState: any) => {
  const [state, setState] = useState(initialState)
  const cbRef: any = useRef(null)

  const setStateCallback = useCallback((state, cb = null) => {
     cbRef.current = cb
     setState(state)
  }, [])

  useEffect(() => {
     if (cbRef.current) {
        cbRef.current(state)
        // cbRef.current = null
     }
  }, [state])

  return [state, setStateCallback]
}

export function debounce(func: () => void, { timeout = 1500 }: any) {
  let timer: any
  return function (this: any, ...args: any) {
     const context: any = this
     if (timer) clearTimeout(timer)
     timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
     }, timeout)
  }
}