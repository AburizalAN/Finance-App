import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { ReactNode, useState, useEffect, useRef } from 'react'

const Container = styled(Box)(() => (`
  &:focus-visible {
    outline: none;
  }
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  outline: none;
  border: none;
`))
const ModalBox = styled(Box)(({ width }) => (`
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 12px 12px 24px;
  font-size: 13px;
  width: ${width ? `${width}px` : 'auto'};
  margin: auto;
  .topLine {
    background: #4848484D;
    width: 69px;
    height: 3px;
    border-radius: 30px;
    margin: auto;
    margin-bottom: 12px;
  }
`))

interface PropTypes {
  children?: ReactNode
  open: boolean
  handleClose: () => void
}

const ModalBottomWrapper = ({ children, open, handleClose }: PropTypes) => {
  const [bodyWidth, setBodyWidth] = useState<any>(null)
  
  useEffect(() => {
    if (window) setBodyWidth(document.body.clientWidth)
  }, [])
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Slide
        in={open}
        direction="up"
        mountOnEnter
        unmountOnExit
      >
        <Container>
          <ModalBox
            width={bodyWidth}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="topLine"></div>
            {children}
          </ModalBox>
        </Container>
      </Slide>
    </Modal>
  )
}

export default ModalBottomWrapper