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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ACTIONS from 'store/registerActions'
import { useRouter } from 'next/router'
import { parseCurrency } from 'services/helper-client'
import moment from 'moment'
import ModalDateRange from 'components/ModalDateRange'
import Skeleton from '@mui/material/Skeleton'

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
  const router = useRouter()
  const dispatch = useDispatch()
  const { expenses, tag, loading } = useSelector((state: any) => state.expenses)
  const { id = null } = router.query

  const [showDateRange, setShowDateRange] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(ACTIONS.expenses.getDetailTag(id))
      dispatch(ACTIONS.expenses.getExpenses(id))
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
        backAction={() => router.push('/pengeluaran')}
        title="List Pengeluaran"
        variant="dark"
        rightContent={<SelectDropdown />}
      />
      {/* Bagian Header */}
      <Header pt="59.719px" bg="#FF7575">
        <Box mt="24px">
          <IconHeader sx={{ backgroundColor: tag && tag.color }}>
            <Bill sx={{ fontSize: '24px' }} />
          </IconHeader>
          <TitleHeader>{tag && tag.name ? tag.name : 'Total'}</TitleHeader>
        </Box>
      </Header>
      {/* Bagian isi */}
      <Box p="12px" sx={{ flex: 1, overflow: 'auto' }}>
        <FilterSection onClickFilterDate={() => setShowDateRange(true)} />
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Box key={i} mt="24px">
              <Skeleton variant="rectangular" width="100%" height="30px" />
            </Box>
          ))
        ) : !loading && expenses.length > 0 ? (
          expenses.map((item: any, i: number) => (
            <Box key={i} mt="24px">
              {/* <DateTitle>10 Maret 2010</DateTitle> */}
              <Box>
                <ThisTransactionItem>
                  <div>
                    <div className="label">{item.label}</div>
                    <div className="date">{moment(item.date).format('DD MMMM YYYY')}</div>
                  </div>
                  <div className="price">-Rp{parseCurrency(item.value)}</div>
                </ThisTransactionItem>
              </Box>
            </Box>
          ))
        ) : null}
      </Box>
      <ModalDateRange
        open={showDateRange}
        handleClose={() => setShowDateRange(false)}
        setStartDate={(date: any) => dispatch(ACTIONS.expenses.setStartDate(date.format('YYYY-MM-DD')))}
        setEndDate={(date: any) => dispatch(ACTIONS.expenses.setEndDate(date.format('YYYY-MM-DD')))}
        handleSubmit={() => dispatch(ACTIONS.expenses.getExpenses(id))}
      />
    </Box>
  )
}

export default DetailPengeluaran