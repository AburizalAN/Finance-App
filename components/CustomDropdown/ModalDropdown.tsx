import React, { useRef, useCallback, useState, useEffect } from 'react'
import Box from '@mui/material/Box'

// eslint-disable-next-line react/display-name
const ModalDropdown = ({
   onSelect = (value: any) => {},
   list,
   isMore,
   moreAction,
   page = null,
   setPage,
   displayName,
   isLoadingMore,
   isLoading,
   setIsLoading,
}: any) => {
   const observer: any = useRef()
   const observeElement = useCallback(
      (node) => {
         if (observer.current) observer.current.disconnect()
         if (isLoading) return
         observer.current = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && isMore) {
               setIsLoading(true)
               setPage(
                  (prev: number) => prev + 1,
                  (prev: number) => moreAction(prev)
               )
            }
         }, options)
         if (node) observer.current.observe(node)
      },
      [isLoading, isMore, moreAction, page]
   )
   const options = {
      threshold: 0.2,
      root: document.querySelector('.suggestions'),
      rootMargin: '0px',
   }

   return (
      <>
         {list.length > 0 &&
            list?.map((item: any, index: number) => (
               <div
                  ref={index === list.length - 1 ? observeElement : null}
                  key={index}
                  className='suggestions__item'
                  onClick={() => onSelect(item)}>
                  {displayName ? displayName(item) : item}
               </div>
            ))}
         {!isLoading && list.length <= 0 && (
            <div className='suggestions__item'>Opps! No data found</div>
         )}
         {isLoading ? (
            <Box px='16px'>
               ...loading
            </Box>
         ) : null}
      </>
   )
}

export default ModalDropdown
