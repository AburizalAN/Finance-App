import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import styled from '@emotion/styled'
import Bill from 'components/icons/Bill'

import SelectDropdown from 'components/SelectDropdown'
import FilterSection from 'components/FilterSection'
import TopBar from 'components/TopBar'
import { DateTitle, TransactionItem, BottomFixSection, BottomFixButton } from 'components/screens/pemasukan.style'
import { Header, TitleHeader, Image } from 'components/Header.style'

const IconHeader = styled(Box)`
  margin: auto;
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ThisTransactionItem = styled(TransactionItem)`
  .price {
    color: #FF8C8C;
  }
`

const DetailPengeluaran: NextPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
      }}>
      <TopBar 
        title="List Pengeluaran"
        variant="dark"
        rightContent={<SelectDropdown />}
      />
      {/* Bagian Header */}
      <Header pt="59.719px" bg="#FF7575">
        <Box mt="24px">
          <IconHeader>
            <Bill sx={{ fontSize: '24px' }} />
          </IconHeader>
          <TitleHeader>Tabungan Hari Tua</TitleHeader>
        </Box>
      </Header>
      {/* Bagian isi */}
      <Box p="12px" sx={{ flex: 1, overflow: 'auto' }}>
        <FilterSection />
        {[...Array(10)].map((item, i) => (
          <Box key={i} mt="24px">
            <DateTitle>10 Maret 2010</DateTitle>
            <Box>
              <ThisTransactionItem>
                <div>
                  <div className="label">Bayar listrik</div>
                  <div className="date">10 Maret 2022</div>
                </div>
                <div className="price">+Rp200.000</div>
              </ThisTransactionItem>
              <ThisTransactionItem>
                <div>
                  <div className="label">Bayar listrik</div>
                  <div className="date">10 Maret 2022</div>
                </div>
                <div className="price">+Rp200.000</div>
              </ThisTransactionItem>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default DetailPengeluaran