import { useState, useEffect, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import ModalDropdown from './ModalDropdown'
import { useStateCallback } from 'services/helper-client'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'

const CustomSelect = styled(Box)`
  background: transparent;
  color: #17948c;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.01em;
  padding: 14px 16px;
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  input {
    border: none;
    background: transparent;
    padding: 0;
    width: 100%;
    color: #17948c !important;
    &::placeholder {
        color: #17948c !important;
    }
  }
  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 10px;
    color: #17948c !important;
  }
  & .loader {
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    color: #17948c !important;
  }
  & .suggestions {
    position: absolute;
    width: 100%;
    maxheight: 250px;
    overflow: auto;
    padding: 0.5rem 0;
    background-color: white;
    ${({ isOnViewport }: { isOnViewport: boolean }) => 
      isOnViewport
        ? 'top: calc(100% + 0.5rem);'
        : 'bottom: calc(100% + 0.5rem);'
    } 
    left: 0;
    border-radius: 5px;
    z-index: 999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    &__item {
        padding: 0.3rem 1rem;
        cursor: pointer;
        &:hover {
          background-color: #ececec;
        }
    }
  }
  ${({ sx }: any) => sx ?? ''}
`

const CustomDropdown = ({
  onSelect = (value: any) => {},
  list,
  inputDisabled,
  isMore,
  moreAction,
  placeholder,
  displayName,
  sx = {},
  onChange = () => {},
  ...rest
}: any) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const [page, setPage] = useStateCallback(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isOnViewport, setIsOnViewport] = useState(false)

  const refDropdown: any = useRef()
  const refBtnDropdown: any = useRef()

  const clickDropdown = (e: any) => {
    e.stopPropagation()
    setIsDropdown(!isDropdown)
  }

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
        if (
          refDropdown.current &&
          !refDropdown.current.contains(event.target) &&
          !refBtnDropdown.current.contains(event.target)
        ) {
          setIsDropdown(false)
        }
    })
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [list])

  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector('#custom-select')
      if (element) {
        const bottomDistance = window.innerHeight - element.getBoundingClientRect().bottom
        const _isOnViewport = bottomDistance > 250
        console.log('_isOnViewport', bottomDistance)
        console.log('isOnViewport', element.getBoundingClientRect().bottom)
        setIsOnViewport(_isOnViewport)
      }
    }, 400)
  }, [])

  return (
    <CustomSelect
        id="custom-select"
        isOnViewport={isOnViewport}
        ref={refBtnDropdown}
        sx={sx}
        onClick={(e) => clickDropdown(e)}>
        {/* <TestItem id="test" /> */}
        <input
          id='custom-select'
          disabled={inputDisabled}
          placeholder={placeholder}
          onChange={(e) => {
              setIsDropdown(true)
              setIsLoading(true)
              onChange(e)
          }}
          {...rest}
        />
        <IconButton type='button'>
          {isDropdown ? (
              <KeyboardArrowDownIcon />
          ) : (
              <KeyboardArrowDownIcon />
          )}
        </IconButton>
        {isDropdown && (
          <Fade in={isDropdown}>
            <div className='suggestions' ref={refDropdown}>
                <ModalDropdown
                  onSelect={(value: any) => {
                      setIsDropdown(false)
                      onSelect(value)
                  }}
                  list={list}
                  isMore={isMore}
                  moreAction={moreAction}
                  displayName={displayName}
                  page={page}
                  setPage={setPage}
                  isLoadi ng={isLoading}
                  setIsLoading={setIsLoading}
                />
            </div>
          </Fade>
        )}
    </CustomSelect>
  )
}

export default CustomDropdown;
