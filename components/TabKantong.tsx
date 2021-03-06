import React, { useState, SyntheticEvent, ReactNode } from 'react'
import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { SliderGrid, AddButton } from 'components/style'
import CardKantong, { ThisCard as CardKantongWrapper } from 'components/CardKantong'
import AddIcon from 'components/icons/AddIcon'
import Link from 'next/link'
import ModalAddKantong from 'components/ModalAddKantong'
import { useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'

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
  font-size: 15px;
  font-weight: 700;
  line-height: 20.46px;
  color: #AEAEAE;
`

interface TabPanelProps {
  index: number
  value: number
  list: Array<any>
  addNewKantong?: () => void
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
  const { list, index, value, addNewKantong } = props
  const { loading } = useSelector((state: any) => state.incomes)

  return (
    <Box mx="-12px" hidden={index !== value}>
      <SliderGrid columnSpacing="12px" px="12px">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Grid item key={i}>
              <Skeleton variant="rectangular" width={155} height={200} />
            </Grid>
          ))
        ) : !loading && list.length > 0 ? (
          list.map((item, i: number) => (
            <Link href={`/kantong/${item.id}`} key={i} passHref>
              <Grid item>
                <CardKantong
                  name={item.name}
                  amount={item.amount}
                  category={item.category}
                  image={"/money-bag.png"}
                />
              </Grid>
            </Link>
          ))
        ) : null}

        {!loading ? (
          <Grid item>
            <CardKantong
              name="Tambah Kantong Baru"
              image="/AddIcon.png"
              onClick={addNewKantong}
            />
          </Grid>
        ) : null}
      </SliderGrid>
    </Box>
  )
}

const TabKantong = ({ list }: {list: Array<any>}) => {
  const [value, setValue] = useState(0);
  const [showAddKantong, setShowAddKantong] = useState(false)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const listTabungan = list.filter((item: any) => item.category === 'tabungan')
  const listInvestasi = list.filter((item: any) => item.category === 'investasi')

  return (
    <Container>
      <Box>
        <Tabs sx={{ marginBottom: '20px' }} value={value} onChange={handleChange}>
          {tabItems.map((item: TabItem, index: number) => (
            <StyledTab label={item.label}  key={index}/>
          ))}
        </Tabs>
      </Box>
      <TabPanel addNewKantong={() => setShowAddKantong(true)} list={list} value={value} index={0} />
      <TabPanel addNewKantong={() => setShowAddKantong(true)} list={listTabungan} value={value} index={1} />
      <TabPanel addNewKantong={() => setShowAddKantong(true)} list={listInvestasi} value={value} index={2} />
      <AddButton onClick={() => setShowAddKantong(true)}>
        <AddIcon />
      </AddButton>
      <ModalAddKantong open={showAddKantong} handleClose={() => setShowAddKantong(false)} />
    </Container>
  )
}

export default TabKantong