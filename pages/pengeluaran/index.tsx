import { useState } from 'react'
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

const Pengeluaran: NextPage = () => {
  const [showAddExpend, setShowAddExpend] = useState(false)
  const [showSelectTag, setShowSelectTag] = useState(false)

  return (
    <Box px="12px" sx={{ minHeight: "100vh", position: 'relative' }}>
      <TopBar title="Pengeluaran" />
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
        <PieChart />
      </Box>
      <Grid mt="30px" mb="12px" container justifyContent="end" alignItems="center">
        <IconButton>
          <Filter mb="12px" sx={{ fontSize: '24px' }}/>
        </IconButton>
      </Grid>
      <Grid container direction="column" sx={{ rowGap: '12px' }}>
        {[...Array(4)].map((_, i) => (
          <Link key={i} href="/pengeluaran/12" passHref>
            <Grid item xs="auto">
              <ThisCard>
                <div className="icon">
                  <Bill fontSize="16px"/>
                </div>
                <Box sx={{ flex: 1 }}>
                  <h5>Tagihan</h5>
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