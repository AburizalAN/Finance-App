import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import ArchiveOut from 'components/icons/ArchiveOut'
import Link from 'next/link'
import { parseCurrency } from 'services/helper-client'

const Container = styled(Grid)`
  margin-top: 62px;
  background: #F6EFFC80;
  border: 1px solid #7C58AA80;
  border-radius: 16px;
  padding: 30px 16px;
  cursor: pointer;
`
Container.defaultProps = { container: true }

const SubTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 20.46px;
  color: #72558ECC;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 20px;
  line-height: 27.28px;
  font-weight: 800;
  color: #72558E;
`

interface PropTypes {
  amount: number
}

const BannerPengeluaran = ({ amount }: PropTypes) => {
  return (
    <Link href="/pengeluaran" passHref>
      <Container alignItems="center">
        <Grid item xs>
          <SubTitle>Pengeluaran Saya</SubTitle>
          <Title>Rp{parseCurrency(amount)}</Title>
        </Grid>
        <Grid item xs="auto" mr="16px">
          <ArchiveOut />
        </Grid>
      </Container>
    </Link>
  )
}

export default BannerPengeluaran