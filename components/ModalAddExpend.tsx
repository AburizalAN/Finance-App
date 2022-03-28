import { useState } from 'react'
import { TopBarTitle } from 'components/TopBar'
import Modal from '@mui/material/Modal'
import ArrowLeft from 'components/icons/ArrowLeft'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Bill from 'components/icons/Bill'
import MuiButton from '@mui/material/Button'
import Slide from '@mui/material/Slide';

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
const ModalBox = styled(Box)(() => (`
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 12px;
  font-size: 13px;
  .topLine {
    background: #4848484D;
    width: 69px;
    height: 3px;
    border-radius: 30px;
    margin: auto;
    margin-bottom: 12px;
  }
`))

const InputStyle = `
  width: 100%;
  border: 1px solid #7C58AA80;
  padding: 12px 16px;
  box-shadow: 0px 0px 20px 0px #7C58AA1A;
  border-radius: 8px;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: none;
  }
`
const InputWrapper = styled(Box)(() => (`
  ${InputStyle}
  * {
    font-size: 18px;
    font-weight: 700;
    line-height: 24.55px;
    color: #6B518B;
    &:focus-visible {
      outline: none;
    }
  }
  input {
    width: 100%;
    padding: 0;
    border: none;
  }
`))
const Input = styled.input(({ width }) => (`
  ${InputStyle}
  color: #6B518B;
  background-color: #F6EFFC80;
  font-size: 13px;
  font-weight: 700;
  &::placeholder {
    color: #C4AEDA;
  }
  width: ${width ?? '100%'};
`))
const IconWrapper = styled(Box)(() => (`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #FF7575;
`))
const Button = styled(MuiButton)(() => (`
  &&& {
    font-size: 15px;
    line-height: 20.46px;
    background-color: #7C58AA;
    border-radius: 16px;
    padding: 12px;
  }
`))

interface PropTypes {
  open: boolean
  handleClose: () => void
  selectTag: () => void
}

const ModalAddExpend = ({ open, handleClose, selectTag }: PropTypes) => {
  const [number, setNumber] = useState(0)

  return (
    <Modal open={open} onClose={handleClose}>
      <Slide direction="up" mountOnEnter unmountOnExit in={open}>
        <Container>
            <ModalBox>
              <div className="topLine"></div>
              <Grid container alignItems="center" mb="24px">
                <IconButton onClick={handleClose}>
                  <ArrowLeft 
                    fill={'#484848'} 
                    sx={{ width: 16, height: 16 }}
                  />
                </IconButton>
                <TopBarTitle style={{ color: '#484848', marginLeft: '12px' }}>
                  Tambah Pengeluaran
                </TopBarTitle>
              </Grid>
              <InputWrapper mb="12px">
                <Box mr="8px">Rp</Box>
                <input value={number} onChange={({ target: { value } }) => setNumber(parseInt(value))} type="number" />
              </InputWrapper>
              <Grid container alignItems='center' justifyContent='end' mb="12px">
                <IconWrapper mr="14px" onClick={selectTag}>
                  <Bill sx={{ fontSize: '20px' }} />
                </IconWrapper>
                <Input placeholder='Judul Pengeluaran' style={{ flex: 1 }} />
              </Grid>
              <Input placeholder='Tanggal' type="date" width="196px" style={{ marginLeft: 'auto' }} />
              <Box mt="28px">
                <Button disableElevation fullWidth variant="contained">
                  Catat Pengeluaran
                </Button>
              </Box>
            </ModalBox>
        </Container>
      </Slide>
    </Modal>
  )
}

export default ModalAddExpend