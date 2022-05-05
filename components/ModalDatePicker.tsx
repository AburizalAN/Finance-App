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
import { useSelector } from 'react-redux'
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

const DateItem = styled.div(({ isMarked, isThisMonth }: any) => {
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
      color: isMarked ? 'white' : isThisMonth ? '#000000' : '#c0c0c0',
      borderRadius: '36px',
      border: 'none',
      outline: 'none',
      background: isMarked ? '#4000d4' : 'none',
      transition: 'all 0.2s ease',
    },
  }
  return styles
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
  selectDate: (value: any) => void
  date?: any
}

const ModalDatePicker = ({ open = false, handleClose, selectDate, date }: PropTypes) => {
  return (
    <Modal open={open}>
      <Fade in={open}>
        <ModalContainer>
          <Content handleClose={handleClose} selectDate={selectDate} date={date} />
        </ModalContainer>
      </Fade>
    </Modal>
  )
}


const Content = ({ handleClose, selectDate, date }: PropTypes) => {
  const [selectedDate, setSelectedDate] = useState<any>(date ? moment(date) : moment())
  const [dates, setDates] = useState<any>([])
  const [calendar, setCalendar] = useState<any>({
    month: selectedDate.month(),
    year: selectedDate.format('YYYY'),
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

  const select = (datetime: any) => {
    const date: any = moment(datetime.split(', ')[0])
    setSelectedDate((prev: any) => (date))
    selectDate(date)
    handleClose()
  }

  const checkThisMonth = (datetime: any) => {
    const date: any = moment(datetime.split(', ')[0])
    return date.month() !== calendar.month ? false : true
  }

  const checkMarked = (datetime: any) => {
    const date: any = moment(datetime.split(', ')[0])
    return date.isSame(selectedDate) ? true : false
  }

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
              <DateItem isThisMonth={checkThisMonth(day.jsDate)} isMarked={checkMarked(day.jsDate)} key={j}>
                <button onClick={() => select(day.jsDate)}>{day.date}</button>
              </DateItem>
            ))}
          </Fragment>
        )) : null}
      </DatesBox>
    </WhiteBox>
  )
}

export default ModalDatePicker