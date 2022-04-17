import styled from '@emotion/styled'
import IconIn from 'components/icons/IconIn'
import { GreenBackground, WhiteBackground } from 'components/style'
import { parseCurrency } from 'services/helper-client'

const TotalSaldoComponent = ({ data }: { data: any }) => {
  return (
    <div>
      <GreenBackground>
        <div className="left">
          <h5>Saldo Saya</h5>
          <h4>Rp{parseCurrency(data?.amount ?? 0)}</h4>
        </div>
        <div className="right">
          <IconIn />
        </div>
      </GreenBackground>
      <WhiteBackground>
        <div className="label">Return</div>
        <div className="value">+Rp1.000.000 (10%)</div>
      </WhiteBackground>
    </div>
  )
}

export default TotalSaldoComponent