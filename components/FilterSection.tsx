import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Filter from 'components/icons/Filter'
import FilterDate from 'components/FilterDate'

const FilterSection = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs="auto">
        <FilterDate />
      </Grid>
      <Grid item xs="auto">
        <IconButton>
          <Filter sx={{ fontSize: '24px' }}/>
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default FilterSection