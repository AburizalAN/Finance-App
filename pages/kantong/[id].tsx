import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import AddIcon from '@mui/icons-material/Add';

import SelectDropdown from 'components/SelectDropdown'
import FilterSection from 'components/FilterSection'
import TopBar from 'components/TopBar'
import { Header, Image, TitleHeader, DateTitle, TransactionItem, BottomFixSection, BottomFixButton } from 'components/screens/pemasukan.style'

const Pemasukan: NextPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
      }}>
      <TopBar 
        title="List Pemasukan"
        variant="dark"
        rightContent={<SelectDropdown />}
      />
      {/* Bagian Header */}
      <Header pt="59.719px">
        <Box mt="24px">
          <Image src="/money-bag.png" alt="money bag" />
          <TitleHeader>Tabungan Hari Tua</TitleHeader>
        </Box>
      </Header>
      {/* Bagian isi */}
      <Box p="12px" mb="78px" sx={{ flex: 1, overflow: 'auto' }}>
        <FilterSection />
        {[...Array(10)].map((item, i) => (
          <Box key={i} mt="24px">
            <DateTitle>10 Maret 2010</DateTitle>
            <Box>
              <TransactionItem>
                <div>
                  <div className="label">Bayar listrik</div>
                  <div className="date">10 Maret 2022</div>
                </div>
                <div className="price">+Rp200.000</div>
              </TransactionItem>
              <TransactionItem>
                <div>
                  <div className="label">Bayar listrik</div>
                  <div className="date">10 Maret 2022</div>
                </div>
                <div className="price">+Rp200.000</div>
              </TransactionItem>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Bagian Bottom Navigation */}
      <BottomFixSection bg="#fcfcfc">
        <BottomFixButton
          variant="outlined"
          fullWidth
          color="success"
          startIcon={<AddIcon />}
        >
          Tambah Pemasukan Baru
        </BottomFixButton>
      </BottomFixSection>
    </Box>
  )
}

export default Pemasukan