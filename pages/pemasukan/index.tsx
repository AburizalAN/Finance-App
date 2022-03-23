import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import AddIcon from '@mui/icons-material/Add';

import SelectDropdown from 'components/SelectDropdown'
import FilterSection from 'components/FilterSection'
import { Header, TopBar, TopBarTitle, Image, TitleHeader, DateTitle, TransactionItem, BottomFixSection, BottomFixButton } from 'components/screens/pemasukan.style'

const Pemasukan: NextPage = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Bagian Header */}
      <Header>
        <TopBar>
          <IconButton sx={{ marginRight: '12px' }}>
            <ArrowLeft sx={{ width: 16, height: 16 }} />
          </IconButton>
          <TopBarTitle>List Pemasukan</TopBarTitle>
          <SelectDropdown />
        </TopBar>
        <Box mt="24px">
          <Image src="/money-bag.png" alt="money bag" />
          <TitleHeader>Tabungan Hari Tua</TitleHeader>
        </Box>
      </Header>
      {/* Bagian isi */}
      <Box p="12px">
        <FilterSection />
        {[...Array(3)].map((item, i) => (
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
      <BottomFixSection>
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