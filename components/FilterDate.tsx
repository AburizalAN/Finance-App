import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Container = styled(Box)`
  border: 1px solid #D1D1D1;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 700;
  line-height: 20.46px;
  display: flex;
  align-items: center;
  grid-column-gap: 8px;
  > div:nth-of-type(2) {
    color: #757575;
  }
`

interface PropTypes {
  onClick?: () => void
}

const FilterDate = ({ onClick }: PropTypes) => {
  const { date } = useSelector((state: any) => state.expenses)

  return (
    <Container onClick={onClick}>
      <div>{moment(date.start).format('DD MMM YY')}</div>
      <div>--</div>
      <div>{moment(date.end).format('DD MMM YY')}</div>
    </Container>
  )
}

export default FilterDate