import { useState, useEffect } from 'react'
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
import { parseCurrency } from 'services/helper-client'

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
  padding: 12px;
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
const IconWrapper = styled(Box)(({ bg }: any) => (`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${bg ?? '#FF7575'};
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
  selectedTag: any
  payload: any
  mutatePayload: (key: string, value: any) => void
  submit: () => void
}

const ModalAddExpend = ({ 
  open,
  payload,
  selectedTag,
  handleClose,
  selectTag,
  mutatePayload,
  submit,
}: PropTypes) => {
  const [bodyWidth, setBodyWidth] = useState<any>(null)

  useEffect(() => {
    if (window) setBodyWidth(document.body.clientWidth)
  }, [])

  return (
    <Modal open={open} onClose={handleClose}>
      <Slide direction="up" mountOnEnter unmountOnExit in={open}>
        <Container onClick={handleClose}>
            <ModalBox 
              width={bodyWidth}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="topLine"></div>
              <Grid container alignItems="center" mb="24px">
                <IconButton onClick={handleClose}>
                  <ArrowLeft 
                    fill={'#484848'} 
                    sx={{ width: 16, height: 16 }}
                  />
                </IconButton>
                <TopBarTitle 
                  style={{ color: '#484848', marginLeft: '12px' }}
                >
                  Tambah Pengeluaran
                </TopBarTitle>
              </Grid>
              <InputWrapper mb="12px">
                <Box mr="8px">Rp</Box>
                <input 
                  value={parseCurrency(payload.value)}
                  onChange={
                    ({ target: { value } }) => 
                    mutatePayload(
                      'value',
                      value.trim().length > 0
                        ? parseInt(value.replace(/[^0-9]/g, ''))
                        : 0
                    )} 
                  type='text'
                />
              </InputWrapper>
              <Grid container alignItems='center' justifyContent='end' mb="12px">
                <IconWrapper bg={selectedTag?.color} mr="14px" onClick={selectTag}>
                  <Bill sx={{ fontSize: '20px' }} />
                </IconWrapper>
                <Input
                  value={payload.label}
                  onChange={(e) => mutatePayload('label', e.target.value)}
                  placeholder='Judul Pengeluaran'
                  style={{ flex: 1 }}
                />
              </Grid>
              <Input
                value={payload.date}
                onChange={(e) => mutatePayload('date', e.target.value)}
                placeholder='Tanggal'
                type="date"
                width="196px"
                style={{ marginLeft: 'auto' }}
              />
              <Box mt="28px">
                <Button onClick={submit} disableElevation fullWidth variant="contained">
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