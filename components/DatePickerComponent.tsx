import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import styled from '@emotion/styled'

const ThisTextField = styled(TextField)`
  margin-left: auto;
  width: 196px;
  & fieldset {
    border-color: #5DB4A4 !important;
  }
  &, & .MuiInputBase-root, & fieldset {
    border-radius: 12px;
  }
  background-color: #5DB4A410;
  &::placeholder {
    color: #33837980;
  }
  & .MuiButtonBase-root {
    margin: 0;
    padding: 8px;
  }
  & input {
    color: #338379;
  }
`

const DatePickerComponent = ({ 
  value,
  setValue
}: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Pick Date"
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue && newValue.format('YYYY-MM-DD'));
        }}
        renderInput={(params: any) => <ThisTextField {...params} />}
      />
    </LocalizationProvider>
  )  
}

export default DatePickerComponent