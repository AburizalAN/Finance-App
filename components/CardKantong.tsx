import { Card } from 'components/style'
import styled from '@emotion/styled'
import { parseCurrency } from 'services/helper-client'

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

interface PropTypes {
  name?: string
  amount?: number
  category?: string
}

const CardKantong = ({ name, amount, category }: PropTypes) => {
  return (
    <ThisCard padding="24px 12px" width="155px">
      <Image src="/money-bag.png" alt="money bag" />
      <Title>{name ?? 'Nama Kantong'}</Title>
      <SubTitle>{amount ? 'Rp ' + parseCurrency(amount) : 'Mulai Menabung'}</SubTitle>
      <Desc>{category ?? 'Category'}</Desc>
    </ThisCard>
  )
}

export default CardKantong