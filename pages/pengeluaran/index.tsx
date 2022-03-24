import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TopBar from 'components/TopBar'
import FilterDate from 'components/FilterDate'
import PieChart from 'components/PieChart'
import IconButton from '@mui/material/IconButton'
import Filter from 'components/icons/Filter'

const Pengeluaran: NextPage = () => {
  return (
    <Box px="12px" sx={{ minHeight: "100vh" }}>
      <TopBar title="Pengeluaran" />
      <Box mt="58px" sx={{ display: 'flex', justifyContent: 'center' }}>
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
      <Box mt="30px">
        <Grid container justifyContent="end" alignItems="center">
          <IconButton>
            <Filter mb="12px" sx={{ fontSize: '24px' }}/>
          </IconButton>
        </Grid>
      </Box>
    </Box>
  )
}

export default Pengeluaran