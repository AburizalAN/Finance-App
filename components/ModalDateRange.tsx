import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { ModalContainer } from 'components/style'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
const { datesGenerator } = require('dates-generator')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const WhiteBox = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  max-width: 420px;
`
const DatesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
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
      width: '46px',
      height: '46px',
      fontSize: '12px',
      borderRadius: '36px',
      border: 'none',
      outline: 'none',
      background: 'none',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      }
    },
  }

  switch (isMarked) {
    case true:
      return {
        ...styles,
        backgroundColor: '#4000d4',
        button: {
          ...styles.button,
          color: 'white',
        }
      }
    case false:
      return {
        ...styles,
      }
  }
})

const HeaderCalendar = styled.div`
  display: flex;
  align-items: center;
  .center {
    margin: auto;
  }
`

interface PropTypes {
  open: boolean
  handleClose: () => void
}

const ModalDateRange = ({ open, handleClose }: PropTypes) => {
  const [selectedDate, setSelectedDate] = useState<any>({
    start: moment(),
    end: moment(),
  })
  const [dates, setDates] = useState<any>([])
  const [calendar, setCalendar] = useState<any>({
    month: selectedDate.start.format('M'),
    year: selectedDate.start.format('YYYY'),
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
    console.log('select', moment(date).format('YYYY-MM-DD'))
    if (selectedDate.start && selectedDate.end) {
      setSelectedDate((prev: any) => ({
        ...prev,
        start: moment(date),
        end: null,
      }))
    } else {
      setSelectedDate((prev: any) => ({
        ...prev,
        end: moment(date),
      }))
    }
  }

  const checkMarked = (datetime: any) => {
    const date: any = datetime.split(', ')[0]
    const now = moment(date)
    if (now.isBefore(selectedDate.end) && now.isAfter(selectedDate.start)) {
      return true
    } else {
      return false
    }
  }

  console.log('dates', dates)

  return (
    <Modal open={open}>
      <Fade in={open}>
        <ModalContainer>
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
          </WhiteBox>
        </ModalContainer>
      </Fade>
    </Modal>
  )
}

export default ModalDateRange