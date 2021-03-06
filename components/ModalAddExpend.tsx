import { useState, useEffect, SyntheticEvent } from 'react'
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
import ModalBottomWrapper from './ModalBottomWrapper'
import ModalDatePicker from 'components/ModalDatePicker'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { InputWrapper, Input, IconWrapper, Button, InputStyle } from 'components/screens/global.style'

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
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    if (window) setBodyWidth(document.body.clientWidth)
  }, [])

  return (
    <ModalBottomWrapper
      open={open} 
      handleClose={handleClose}
    >
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
          onChange={(e: any) => mutatePayload('label', e.target.value)}
          placeholder='Judul Pengeluaran'
          style={{ flex: 1 }}
        />
      </Grid>
      <Box
        onClick={() => setShowDatePicker(true)}
        width="196px"
        sx={{
          ...InputStyle,
          marginLeft: 'auto',
          color: '#6B518B',
          backgroundColor: '#F6EFFC80',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {payload.date ?? 'Pilih Tanggal'}
        </div>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Box mt="28px">
        <Button onClick={submit} disableElevation fullWidth variant="contained">
          Catat Pengeluaran
        </Button>
      </Box>
      <ModalDatePicker
        open={showDatePicker}
        handleClose={() => setShowDatePicker(false)}
        selectDate={(datetime: any) => mutatePayload('date', datetime.format('YYYY-MM-DD'))}
        date={payload.date}
      />
    </ModalBottomWrapper>
  )
}

export default ModalAddExpend