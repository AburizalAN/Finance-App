import { Card } from 'components/style'
import styled from '@emotion/styled'

const ThisCard = styled(Card)`
  height: 100%;
  *:not(:last-child) {
    margin-bottom: 2px;
  }
`
const Image = styled.img`
  margin-bottom: 20px !important;
`
const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 20.46px;
`
const SubTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  line-height: 17.73px;
  color: #AEAEAE;
`
const Desc = styled.div`
  font-size: 10px;
  line-height: 13.64px;
  color: #AEAEAE;
`


const CardKantong = () => {
  return (
    <ThisCard padding="24px 12px" width="155px">
      <Image src="/money-bag.png" alt="money bag" />
      <Title>Tabungan Hari Tua</Title>
      <SubTitle>Rp100.000.000</SubTitle>
      <Desc>Investasi</Desc>
    </ThisCard>
  )
}

export default CardKantong