import Box from '@mui/material/Box'
import styled from '@emotion/styled'

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
  onClick: () => void
}

const FilterDate = ({ onClick }: PropTypes) => {
  return (
    <Container onClick={onClick}>
      <div>15 Feb 22</div>
      <div>--</div>
      <div>01 Mar 22</div>
    </Container>
  )
}

export default FilterDate