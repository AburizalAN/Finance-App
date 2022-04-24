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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ACTIONS from 'store/registerActions'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from "@emotion/react";

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
const ThisButton = styled(Button)(() => ({
  '&&&': {
    backgroundColor: '#338379',
  }
}))
const loader = css`
  display: block;
  margin: 0 auto;
  height: 15px;
`;

const ModalAddKantong = ({ open, handleClose }: PropTypes) => {
  const dispatch = useDispatch()
  const { loadingAddKantong } = useSelector((state: any) => state.incomes)

  const [payload, setPayload] = useState({
    name: null,
    category: null,
  })  

  const mutatePayload = (key: string, value: string) => {
    setPayload({
      ...payload,
      [key]: value,
    })
  }

  const handleSubmit = () => {
    dispatch(ACTIONS.incomes.addKantong(payload, () => {
      handleClose()
    }))
  }
  
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
          Tambah Kantong Baru
        </TopBarTitle>
      </Grid>
      <Grid
        container
        rowGap="12px"
        direction="column"
        alignItems="flex-end"
      >
        <ThisInputWrapper width="100%">
          <input
            placeholder="Nama Kantong"
            onChange={(e) =>
              mutatePayload('name', e.target.value)
            } 
            type='text'
          />
        </ThisInputWrapper>
        <ThisInputWrapper width="300px">
          <CustomDropdown
            inputDisabled
            placeholder="Pilih Kategori"
            value={payload.category}
            list={['tabungan', 'investasi']}
            sx={{
              padding: 0,
            }}
            onSelect={(item: any) =>
              mutatePayload('category', item)
            }
          />
        </ThisInputWrapper>
      </Grid>
      <Box mt="28px">
        <ThisButton
          disabled={loadingAddKantong || !payload.name || !payload.category}
          onClick={handleSubmit}
          disableElevation
          fullWidth
          variant="contained"
        >
          {loadingAddKantong 
            ? <ClipLoader color="#cccccc" size={20} />
            : 'Tambah Kantong'
          }
        </ThisButton>
      </Box>
    </ModalBottomWrapper>
  )
}

export default ModalAddKantong