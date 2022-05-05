import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

import SelectDropdown from 'components/SelectDropdown'
import FilterSection from 'components/FilterSection'
import TopBar from 'components/TopBar'
import { DateTitle, TransactionItem, BottomFixSection, BottomFixButton } from 'components/screens/pemasukan.style'
import { Header, TitleHeader, Image } from 'components/Header.style'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ACTIONS from 'store/registerActions'
import { parseCurrency } from 'services/helper-client'
import moment from 'moment'
import ModalAddIncomes from 'components/ModalAddIncomes'
import Skeleton from '@mui/material/Skeleton'

const Pemasukan: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { incomes, loading } = useSelector((state: any) => state.incomes)
  const { id = null } = router.query

  const [showAddIncomes, setShowAddIncomes] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(ACTIONS.incomes.getIncomes(id !== 'all' ? id : null))
    }
  }, [id])

  return (
    <Box
      sx={{
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
      }}>
      <TopBar
        backAction={() => router.push('/')}
        title="List Pemasukan"
        variant="dark"
        rightContent={<SelectDropdown />}
      />
      {/* Bagian Header */}
      <Header bg="#5DB4A4" pt="59.719px">
        <Box mt="24px">
          <Image src="/money-bag.png" alt="money bag" />
          <TitleHeader>{incomes[0]?.kantong?.name}</TitleHeader>
        </Box>
      </Header>
      {/* Bagian isi */}
      <Box p="12px" mb="78px" sx={{ flex: 1, overflow: 'auto' }}>
        <FilterSection />
        <Box mt="24px">
          {/* <DateTitle>10 Maret 2010</DateTitle> */}
          {loading ? (
            [...Array(7)].map((_, i) => (
              <TransactionItem key={i}>
                <Skeleton variant="rectangular" width="100%" height="30px" />
              </TransactionItem>
            ))
          ) : !loading && incomes.length > 0 ? incomes.map((item: any, i: number) => (
            <TransactionItem key={i}>
              <div>
                <div className="label">{item.from}</div>
                <div className="date">{moment(item.date).format('DD MMMM YYYY')}</div>
              </div>
              <div className="price">+Rp{parseCurrency(item.value)}</div>
            </TransactionItem>
          )) : null}
        </Box>
      </Box>
      {/* Bagian Bottom Navigation */}
      <BottomFixSection bg="#fcfcfc">
        <BottomFixButton
          variant="outlined"
          fullWidth
          color="success"
          startIcon={<AddIcon />}
          onClick={() => setShowAddIncomes(true)}
        >
          Tambah Pemasukan Baru
        </BottomFixButton>
      </BottomFixSection>
      <ModalAddIncomes open={showAddIncomes} handleClose={() => setShowAddIncomes(false)} />
    </Box>
  )
}

export default Pemasukan