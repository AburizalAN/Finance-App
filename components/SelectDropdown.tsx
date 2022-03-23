import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Container = styled.div`
  border: 1px solid #FFFFFF99;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Label = styled.div`
  font-size: 13px;
  font-weight: 700;
  line-height: 17.73px;
  margin-right: 4px;
  color: white;
`

const SelectDropdown = () => {
  return (
    <Container>
      <Label>This is Label</Label>
      <IconButton>
        <KeyboardArrowDownIcon sx={{ color: 'white' }} />
      </IconButton>
    </Container>
  )
}

export default SelectDropdown