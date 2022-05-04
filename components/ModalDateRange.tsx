import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { ModalContainer } from 'components/style'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
const { datesGenerator } = require('dates-generator')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const WhiteBox = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  max-width: 312px;
  min-width: min-content;
`
const DatesBox = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(5, 40px);
  row-gap: 2px;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
    border-bottom: 1px solid #dddddd;
  }
`

const DateItem = styled.div(({ isMarked }: any) => {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      fontSize: '12px',
      borderRadius: '36px',
      border: 'none',
      outline: 'none',
      background: 'none',
      transition: 'all 0.2s ease',
    },
  }

  switch (isMarked) {
    case 'active':
      return {
        ...styles,
        backgroundColor: '#5331b1',
        button: {
          ...styles.button,
          color: 'white',
        }
      }
    case 'start':
      return {
        ...styles,
        backgroundColor: '#5331b1',
        borderRadius: '50% 0 0 50%',
        button: {
          ...styles.button,
          backgroundColor: '#4000d4',
          color: 'white',
        }
      }
    case 'end':
      return {
        ...styles,
        backgroundColor: '#5331b1',
        borderRadius: '0 50% 50% 0',
        button: {
          ...styles.button,
          backgroundColor: '#4000d4',
          color: 'white',
        }
      }
    case 'single': {
      return {
        ...styles,
        backgroundColor: '#5331b1',
        borderRadius: '50%',
        button: {
          ...styles.button,
          backgroundColor: '#4000d4',
          color: 'white',
        }
      }
    }
    default:
      return {
        ...styles,
      }
  }
})

const HeaderCalendar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  .center {
    margin: auto;
  }
`

interface PropTypes {
  open?: boolean
  handleClose: () => void
  setStartDate: (value: any) => void
  setEndDate: (value: any) => void
  handleSubmit: () => void
}

const ModalDateRange = ({ open = false, handleClose, setStartDate, setEndDate, handleSubmit }: PropTypes) => {
  return (
    <Modal open={open}>
      <Fade in={open}>
        <ModalContainer>
          <Content handleClose={handleClose} setStartDate={setStartDate} setEndDate={setEndDate} handleSubmit={handleSubmit} />
        </ModalContainer>
      </Fade>
    </Modal>
  )
}


const Content = ({ handleClose, setStartDate, setEndDate, handleSubmit }: PropTypes) => {
  const [selectedDate, setSelectedDate] = useState<any>({
    point1: moment(),
    point2: moment(),
  })
  const [dates, setDates] = useState<any>([])
  const [calendar, setCalendar] = useState<any>({
    month: selectedDate.point1.format('M'),
    year: selectedDate.point1.format('YYYY'),
  })

  useEffect(() => {
    const payload = {
      month: calendar.month,
      year: calendar.year,
    }

    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(payload)

    setDates([ ...dates ])
    setCalendar((prev: any) => ({
      ...prev,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    }))
  }, [])

  const onClickNext = () => {
    console.log('next')
    const payload = {
      month: calendar.nextMonth,
      year: calendar.nextYear,
    }

    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(payload)

    setDates([ ...dates ])
    setCalendar((prev: any) => ({
      ...prev,
      month: prev.nextMonth,
      year: prev.nextYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    }))
  }

  const onClickPrev = () => {
    console.log('prev')
    const payload = {
      month: calendar.previousMonth,
      year: calendar.previousYear,
    }

    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(payload)

    setDates([ ...dates ])
    setCalendar((prev: any) => ({
      ...prev,
      month: prev.previousMonth,
      year: prev.previousYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    }))
  }

  const selectDate = (datetime: any) => {
    const date: any = datetime.split(', ')[0]
    if (selectedDate.point1 && selectedDate.point2) {
      setSelectedDate((prev: any) => ({
        ...prev,
        point1: moment(date),
        point2: null,
      }))
    } else {
      setSelectedDate((prev: any) => ({
        ...prev,
        point2: moment(date),
      }))
    }
  }

  const checkMarked = (datetime: any) => {
    const date: any = datetime.split(', ')[0]
    const now = moment(date)
    let start, end
    
    if (selectedDate.point1.isBefore(selectedDate.point2)) {
      start = selectedDate.point1
      end = selectedDate.point2
    } else if (selectedDate.point1.isAfter(selectedDate.point2)) {
      start = selectedDate.point2
      end = selectedDate.point1
    } else if (now.isSame(selectedDate.point1)) {
      return 'single'
    } else {
      start = null
      end = null
    }

    if (now.isBefore(end) && now.isAfter(start)) {
      return 'active'
    } else if (now.isSame(start)) {
      return 'start'
    } else if (now.isSame(end)) {
      return 'end'
    } else {
      return null
    }
  }

  console.log('dates', dates)

  useEffect(() => {
    const { point1, point2 } = selectedDate
    if (point1.isBefore(point2)) {
      setStartDate(point1)
      setEndDate(point2)
    } else if (point1.isAfter(point2)) {
      setStartDate(point2)
      setEndDate(point1)
    } else {
      setStartDate(point1)
      setEndDate(point1)
    }
  }, [selectedDate])

  return (
    <WhiteBox>
      <Grid mb="12px" container justifyContent="flex-end">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <HeaderCalendar>
        <IconButton onClick={onClickPrev}>
          <ChevronLeftIcon />
        </IconButton>
        <div className="center">{months[calendar.month]} {calendar.year}</div>
        <IconButton onClick={onClickNext}>
          <ChevronRightIcon />
        </IconButton>
      </HeaderCalendar>
      <DatesBox>
        {days.map((day: string, i: number) => (
          <Fragment key={i}>
            <div className="header">{day}</div>
          </Fragment>
        ))}
        {dates.length > 0 ? dates.map((week: any, i: number) => (
          <Fragment key={i}>
            {week.map((day: any, j: number) => (
              <DateItem isMarked={checkMarked(day.jsDate)} key={j}>
                <button onClick={() => selectDate(day.jsDate)}>{day.date}</button>
              </DateItem>
            ))}
          </Fragment>
        )) : null}
      </DatesBox>
      <Box mt="16px">
        <Button onClick={handleSubmit} sx={{ p: '14px', borderRadius: '12px' }} variant="contained" fullWidth disableElevation>
          Save
        </Button>
      </Box>
    </WhiteBox>
  )
}

export default ModalDateRange