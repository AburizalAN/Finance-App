import { useState, useEffect, SyntheticEvent } from 'react'
import { TopBarTitle } from 'components/TopBar'
import ArrowLeft from 'components/icons/ArrowLeft'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Bill from 'components/icons/Bill'
import { parseCurrency } from 'services/helper-client'
import ModalBottomWrapper from './ModalBottomWrapper'
import { InputWrapper, Input, IconWrapper, Button } from 'components/screens/global.style'
import { useRouter} from 'next/router'
import DatePickerComponent from 'components/DatePickerComponent'
import { useDispatch, useSelector } from 'react-redux'
import ACTIONS from 'store/registerActions'

interface PropTypes {
  open: boolean
  handleClose: () => void
}

const ThisInputWrapper = styled(InputWrapper)({
  borderColor: '#5DB4A4 !important',
  color: '#338379',
  '& input::placeholder': {
    color: '#33837980',
  },
  '*': {
    color: '#338379',
  },
})
const ThisButton = styled(Button)(() => ({
  '&&&': {
    backgroundColor: '#338379',
  }
}))
const ThisInput = styled(Input)`
  border-color: #5DB4A4 !important;
  color: #338379;
  background-color: #5DB4A410;
  &::placeholder {
    color: #33837980;
  }
`

const ModalAddIncomes = ({ 
  open,
  handleClose,
}: PropTypes) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id = null } = router.query
  const [payload, setPayload] = useState({
    date: null,
    from: null,
    kantong: null,
    value: 0,
  })

  const mutatePayload = (key: string, value: any) => {
    setPayload({
      ...payload,
      [key]: value,
    })
  }

  const handleSubmitIncomes = () => {
    dispatch(ACTIONS.incomes.addIncomes(payload, () => {
      handleClose()
    }))
  }

  useEffect(() => {
    mutatePayload('kantong', id)
  }, [id])

  console.log(payload)

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
      <Grid container direction="column" rowGap="12px">
        <ThisInputWrapper>
          <Box>Rp</Box>
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
        </ThisInputWrapper>
        <ThisInput
          value={payload.from}
          onChange={(e: any) => mutatePayload('from', e.target.value)}
          placeholder='From'
          style={{ flex: 1 }}
        />
        <DatePickerComponent
          value={payload.date} 
          setValue={(value: any) => mutatePayload('date', value)}
        />
      </Grid>
      <Box mt="28px">
        <ThisButton
          onClick={handleSubmitIncomes}
          disableElevation
          fullWidth
          variant="contained"
        >
          Tambah Pemasukan
        </ThisButton>
      </Box>
    </ModalBottomWrapper>
  )
}

export default ModalAddIncomes