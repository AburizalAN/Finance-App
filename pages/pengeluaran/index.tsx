import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TopBar from 'components/TopBar'
import FilterDate from 'components/FilterDate'
import PieChart from 'components/PieChart'
import Filter from 'components/icons/Filter'
import Bill from 'components/icons/Bill'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'
import AddIcon from 'components/icons/AddIcon'
import Link from 'next/link'
import { ThisCard, ThisAddButton, ThisLinearProgress, AddButtonWrapper } from 'components/screens/pengeluaran.style'
import ModalAddExpend from 'components/ModalAddExpend'
import ModalSelectTag from 'components/ModalSelectTag'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from 'store/registerActions'
import { db } from 'services/firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'
import ModalDateRange from 'components/ModalDateRange'

const Pengeluaran: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { summary, expenses, tags, date } = useSelector((state: any) => state.expenses)
  const { tags: listTags } = useSelector((state: any) => state.expenses)

  const [totalExpenses, setTotalExpenses] = useState(0)
  const [showAddExpend, setShowAddExpend] = useState(false)
  const [showSelectTag, setShowSelectTag] = useState(false)
  const [showDateRange, setShowDateRange] = useState(false)
  // const [tags, setTags] = useState([])
  const [filteredTag, setFilteredTag] = useState<Array<any>>([])
  const [selectedTag, setSelectedTag] = useState<any>(null)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: [],
      borderWidth: 0,
    }],
  })
  const [payload, setPayload] = useState<any>({
    label: null,
    tag: null,
    date: null,
    value: 0,
  })
  const [bodyWidth, setBodyWidth] = useState<any>(null)

  const mutatePayload = (key: string, value: any) => {
    setPayload((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const resetState = () => {
    setPayload({
      label: null,
      tag: null,
      date: null,
      value: 0,
    })
    setSelectedTag(tags[0])
  }

  const handleCloseAddExpend = () => {
    setShowAddExpend(false)
    resetState()
  }

  const submitExpense = () => {
    dispatch(ACTIONS.expenses.postExpenseData(payload, async () => {
      handleCloseAddExpend()
      dispatch(ACTIONS.expenses.getExpenses())
    }))
  }

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => {
        setBodyWidth(document.body.clientWidth)
      })
    }
  })

  useEffect(() => {
    // const unsubscribe = onSnapshot(expensesRef, (querySnapshot) => {
    //   dispatch(ACTIONS.expenses.getSummaryExpenses())
    //   console.log('listen')
    // });
    if (window) setBodyWidth(document.body.clientWidth)
    dispatch(ACTIONS.expenses.getTags())
    dispatch(ACTIONS.expenses.getExpenses())
  }, [])

  useEffect(() => {
    let total: number = 0;
    expenses.forEach((expense: any) => {
      total += expense.value
    })
    setTotalExpenses(total)
  }, [expenses])

  useEffect(() => {
    const _filteredTag: Array<any> = []

    tags.forEach((tag: any) => {
      let totalByTag: number = 0
      expenses.forEach((expense: any) => {
        if (expense.tag.id === parseInt(tag.id)) {
          totalByTag += expense.value
        }
      })
      if (totalByTag > 0) {
        _filteredTag.push({
          ...tag,
          amount: totalByTag,
        })
      }
    })

    setFilteredTag(_filteredTag)
  }, [tags, expenses])

  useEffect(() => {
    if (tags.length > 0) {
      setSelectedTag(tags[0])
    }
  }, [tags])

  useEffect(() => {
    let labels: Array<string> = []
    let data: Array<any> = []
    let backgroundColor: Array<string> = []
    filteredTag.forEach((item: any) => {
      labels = [...labels, item.name]
      data = [ ...data, item.amount ]
      backgroundColor = [ ...backgroundColor, item.color ]
    })
    setChartData((prev: any) => ({
      ...prev,
      labels,
      datasets: [{
        ...prev.datasets[0],
        data,
        backgroundColor,
      }]
    }))
  }, [filteredTag])

  useEffect(() => {
    if (selectedTag) {
      mutatePayload('tag', selectedTag.id)
    }
  }, [selectedTag])

  return (
    <Box px="12px" pb="24px" sx={{ minHeight: "100vh", position: 'relative' }}>
      <TopBar backAction={() => router.push('/')} title="Pengeluaran" />
      <Box pt="58px" sx={{ display: 'flex', justifyContent: 'center' }}>
        <FilterDate onClick={() => setShowDateRange(true)} />
      </Box>
      <Box mt="30px" sx={{ position: 'relative' }}>
        <Box 
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
          }}
        >
          <IconButton>
            <Filter sx={{ fontSize: '24px' }}/>
          </IconButton>
        </Box>
        <PieChart value={totalExpenses} data={chartData} />
      </Box>
      <Grid 
        mt="30px"
        mb="12px"
        container
        justifyContent="end"
        alignItems="center"
      >
        <IconButton>
          <Filter mb="12px" sx={{ fontSize: '24px' }}/>
        </IconButton>
      </Grid>
      <Grid container direction="column" sx={{ rowGap: '12px' }}>
        <Link href={`/pengeluaran/total`} passHref>
          <Grid item xs="auto">
            <ThisCard>
              <div className="icon">
                <Bill fontSize="16px"/>
              </div>
              <Box sx={{ flex: 1 }}>
                <h5>Total</h5>
                <Box mt="8px">
                  <ThisLinearProgress variant="determinate" value={100} />
                </Box>
              </Box>
              <IconButton>
                <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </ThisCard>
          </Grid>
        </Link>
        {filteredTag.map((tag: any, i: number) => (
          <Link key={i} href={`/pengeluaran/${tag.id}`} passHref>
            <Grid item xs="auto">
              <ThisCard>
                <div className="icon" 
                  style={{ 
                    backgroundColor: tag.color 
                  }}
                >
                  <Bill fontSize="16px"/>
                </div>
                <Box sx={{ flex: 1 }}>
                  <h5>{tag.name}</h5>
                  <Box mt="8px">
                    <ThisLinearProgress
                      variant="determinate"
                      value={tag.amount / totalExpenses * 100}
                    />
                  </Box>
                </Box>
                <IconButton>
                  <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
                </IconButton>
              </ThisCard>
            </Grid>
          </Link>
        ))}
      </Grid>
      <AddButtonWrapper width={bodyWidth}>
        <ThisAddButton onClick={() => setShowAddExpend(true)}>
          <AddIcon />
        </ThisAddButton>
      </AddButtonWrapper>
      <ModalAddExpend 
        open={showAddExpend}
        handleClose={handleCloseAddExpend}
        selectTag={() => setShowSelectTag(true)}
        selectedTag={selectedTag}
        payload={payload}
        submit={submitExpense}
        mutatePayload={mutatePayload}
      />
      <ModalSelectTag
        tags={listTags}
        open={showSelectTag}
        onSelect={(value: any) => setSelectedTag(value)}
        handleClose={() => setShowSelectTag(false)}
      />
      <ModalDateRange
        open={showDateRange}
        handleClose={() => setShowDateRange(false)}
        setStartDate={(date: any) => dispatch(ACTIONS.expenses.setStartDate(date.format('YYYY-MM-DD')))}
        setEndDate={(date: any) => dispatch(ACTIONS.expenses.setEndDate(date.format('YYYY-MM-DD')))}
        handleSubmit={() => dispatch(ACTIONS.expenses.getExpenses())}
      />
    </Box>
  )
}

export default Pengeluaran