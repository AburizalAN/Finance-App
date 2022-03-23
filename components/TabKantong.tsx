import React, { useState, SyntheticEvent, ReactNode } from 'react'
import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { SliderGrid } from 'components/style'
import CardKantong from 'components/CardKantong'
import AddIcon from 'components/icons/AddIcon'
import Link from 'next/link'

const Container = styled.div`
  margin-top: 62px;
  position: relative;
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
const AddButton = styled.button`
  background-color: #338379;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(50%);
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
          <Link href={`/kantong/1`} key={i} passHref>
            <Grid item>
              <CardKantong />
            </Grid>
          </Link>
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
      <AddButton>
        <AddIcon />
      </AddButton>
    </Container>
  )
}

export default TabKantong