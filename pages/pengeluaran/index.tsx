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
import { ThisCard, ThisAddButton, ThisLinearProgress } from 'components/screens/pengeluaran.style'
import ModalAddExpend from 'components/ModalAddExpend'
import ModalSelectTag from 'components/ModalSelectTag'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from 'store/registerActions'

const Pengeluaran: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { summary } = useSelector((state: any) => state.expenses)

  const [showAddExpend, setShowAddExpend] = useState(false)
  const [showSelectTag, setShowSelectTag] = useState(false)
  const [tags, setTags] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: [],
      borderWidth: 0,
    }],
  })

  useEffect(() => {
    dispatch(ACTIONS.expenses.getSummaryExpenses())
  }, [])

  const total = summary.find((item: any) => item.id === 'total')

  useEffect(() => {
    let labels: Array<string> = []
    let data: Array<any> = []
    let backgroundColor: Array<string> = []
    const _tags = summary.filter((item: any) => {
      if (item.id !== 'total' && item.count > 0) {
        labels = [...labels, item.name]
        data = [ ...data, item.count ]
        backgroundColor = [ ...backgroundColor, item.color ]
        return item
      }
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
    setTags(_tags)
  }, [summary])

  return (
    <Box px="12px" sx={{ minHeight: "100vh", position: 'relative' }}>
      <TopBar backAction={() => router.push('/')} title="Pengeluaran" />
      <Box pt="58px" sx={{ display: 'flex', justifyContent: 'center' }}>
        <FilterDate />
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
        <PieChart value={total && total.count} data={chartData} />
      </Box>
      <Grid mt="30px" mb="12px" container justifyContent="end" alignItems="center">
        <IconButton>
          <Filter mb="12px" sx={{ fontSize: '24px' }}/>
        </IconButton>
      </Grid>
      <Grid container direction="column" sx={{ rowGap: '12px' }}>
        <Link href={`/pengeluaran/${total && total.id}`} passHref>
          <Grid item xs="auto">
            <ThisCard>
              <div className="icon">
                <Bill fontSize="16px"/>
              </div>
              <Box sx={{ flex: 1 }}>
                <h5>{total && total.name}</h5>
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
        {tags.map((tag: any, i: number) => (
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
                    <ThisLinearProgress variant="determinate" value={tag.count / total.count * 100} />
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
      <ThisAddButton onClick={() => setShowAddExpend(true)}>
        <AddIcon />
      </ThisAddButton>
      <ModalAddExpend 
        open={showAddExpend}
        handleClose={() => setShowAddExpend(false)}
        selectTag={() => setShowSelectTag(true)}
      />
      <ModalSelectTag open={showSelectTag} handleClose={() => setShowSelectTag(false)}/>
    </Box>
  )
}

export default Pengeluaran