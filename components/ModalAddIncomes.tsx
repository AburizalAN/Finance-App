import { useState, useEffect, SyntheticEvent } from 'react'
import { TopBarTitle } from 'components/TopBar'
import ArrowLeft from 'components/icons/ArrowLeft'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { parseCurrency } from 'services/helper-client'
import ModalBottomWrapper from './ModalBottomWrapper'
import { InputWrapper, Input, IconWrapper, Button, InputStyle } from 'components/screens/global.style'
import { useRouter} from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import ModalDatePicker from 'components/ModalDatePicker'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
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
  const [showDatePicker, setShowDatePicker] = useState(false)

  const mutatePayload = (key: string, value: any) => {
    setPayload({
      ...payload,
      [key]: value,
    })
  }

  const handleSubmitIncomes = () => {
    dispatch(ACTIONS.incomes.addIncomes(payload, () => {
      handleClose()
      dispatch(ACTIONS.incomes.getIncomes(id !== 'all' ? id : null))
    }))
  }

  useEffect(() => {
    mutatePayload('kantong', id)
  }, [id])

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
          Tambah Pemasukan
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
        <Box
          onClick={() => setShowDatePicker(true)}
          width="196px"
          sx={{
            ...InputStyle,
            marginLeft: 'auto',
            borderColor: '#5DB4A4 !important',
            color: '#338379',
            backgroundColor: '#5DB4A410',
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
      <ModalDatePicker
        open={showDatePicker}
        handleClose={() => setShowDatePicker(false)}
        selectDate={(datetime: any) => mutatePayload('date', datetime.format('YYYY-MM-DD'))}
        date={payload.date}
      />
    </ModalBottomWrapper>
  )
}

export default ModalAddIncomes