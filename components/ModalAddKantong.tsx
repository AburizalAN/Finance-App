import ModalBottomWrapper from "components/ModalBottomWrapper"
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import { TopBarTitle } from 'components/TopBar'
import { parseCurrency } from 'services/helper-client'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import { InputWrapper, Input, IconWrapper, Button, Typography } from 'components/screens/global.style'
import CustomDropdown from "components/CustomDropdown"
import { useEffect } from 'react'

interface PropTypes {
  open: boolean
  handleClose: () => void
}

const ThisInputWrapper = styled(InputWrapper)({
  borderColor: '#5DB4A4 !important',
  color: '#338379',
  backgroundColor: '#5DB4A410',
  '& input::placeholder': {
    color: '#33837980',
  },
  '*': {
    fontSize: '13px',
    color: '#338379',
  },
})

const ModalAddKantong = ({ open, handleClose }: PropTypes) => {
   
  return (
    <ModalBottomWrapper open={open} handleClose={handleClose}>
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
          Tambah Kantong Baru
        </TopBarTitle>
      </Grid>
      <Grid container rowGap="12px" direction="column">
        <ThisInputWrapper>
          <input
            placeholder="Nama Kantong"
            onChange={() => {}} 
            type='text'
          />
        </ThisInputWrapper>
        <ThisInputWrapper>
          <CustomDropdown
            inputDisabled
            value={'Pilih Kategory'}
            list={['tabungan', 'investasi']}
            sx={{
              padding: 0,
            }}
          />
        </ThisInputWrapper>
      </Grid>
    </ModalBottomWrapper>
  )
}

export default ModalAddKantong