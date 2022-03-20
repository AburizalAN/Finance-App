import React, { useState, SyntheticEvent, ReactNode } from 'react'
import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Card, SliderGrid } from 'components/style'

const Container = styled.div`
  margin-top: 62px;
`
const StyledTab = styled(Tab)`
  padding: 0;
  margin-right: 20px;
  min-width: 0;
  max-width: auto;
  text-transform: none;
  min-height: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 17.73px;
  color: #AEAEAE;
`

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

interface TabItem {
  label: string,

}

const tabItems: Array<TabItem> = [
  { label: 'Semua Kantong' },
  { label: 'Tabungan' },
  { label: 'Investasi'},
]

const TabPanel = (props: TabPanelProps) => {
  const { children, index, value } = props
  return (
    <Box mx="-12px" hidden={index !== value}>
      <SliderGrid columnSpacing="12px" px="12px">
        {[...Array(4)].map((item, i: number) => (
          <Grid key={i} item>
            <Card padding="24px 12px" width="155px">
              <img src="/money-bag.png" alt="money bag" />
            </Card>
          </Grid>
        ))}
      </SliderGrid>
    </Box>
  )
}

const TabKantong = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Box>
        <Tabs sx={{ marginBottom: '20px' }} value={value} onChange={handleChange}>
          {tabItems.map((item: TabItem, index: number) => (
            <StyledTab label={item.label}  key={index}/>
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Container>
  )
}

export default TabKantong