import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import ArchiveOut from 'components/icons/ArchiveOut'

const Container = styled(Grid)`
  margin-top: 62px;
  background: #F6EFFC80;
  border: 1px solid #7C58AA80;
  border-radius: 16px;
  padding: 30px 16px;
`
Container.defaultProps = { container: true }

const SubTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  line-height: 17.73px;
  color: #72558ECC;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 20px;
  line-height: 27.28px;
  font-weight: 800;
  color: #72558E;
`

const BannerPengeluaran = () => {
  return (
    <Container alignItems="center">
      <Grid item xs>
        <SubTitle>Pengeluaran Saya</SubTitle>
        <Title>Rp1.000.000</Title>
      </Grid>
      <Grid item xs="auto" mr="16px">
        <ArchiveOut />
      </Grid>
    </Container>
  )
}

export default BannerPengeluaran