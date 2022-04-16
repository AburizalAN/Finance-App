import ModalBottomWrapper from "components/ModalBottomWrapper"
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import { TopBarTitle } from 'components/TopBar'
import { parseCurrency } from 'services/helper-client'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import { InputWrapper, Input, IconWrapper, Button } from 'components/screens/global.style'

interface PropTypes {
  open: boolean
  handleClose: () => void
}

const ThisInput = styled(Input)({
  borderColor: '#5DB4A4 !important',
  color: '#338379',
  backgroundColor: '#5DB4A410',
  '&::placeholder': {
    color: '#33837980',
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
      <ThisInput
        placeholder="test"
      />
    </ModalBottomWrapper>
  )
}

export default ModalAddKantong