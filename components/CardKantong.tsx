import { Card } from 'components/style'
import styled from '@emotion/styled'
import { parseCurrency } from 'services/helper-client'

export const ThisCard = styled(Card)`
  min-height: 200px;
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
  image?: string
  onClick?: () => void
}

const CardKantong = ({ name, amount, category, image, onClick = () => {} }: PropTypes) => {
  return (
    <ThisCard onClick={onClick} padding="24px 12px" width="155px">
      <Image src={image} alt="money bag" />
      <Title>{name ?? 'Nama Kantong'}</Title>
      <SubTitle>{amount ? 'Rp ' + parseCurrency(amount) : 'Mulai Menabung'}</SubTitle>
      <Desc>{category ?? null}</Desc>
    </ThisCard>
  )
}

export default CardKantong