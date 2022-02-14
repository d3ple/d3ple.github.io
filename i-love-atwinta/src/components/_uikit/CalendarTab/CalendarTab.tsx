import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

// Styles
import s from '~/components/_uikit/CalendarTab/CalendarTab.module.scss'
// Components
import Button from '~/components/_uikit/Button'
import { Typography } from '@mui/material'
import { formatDate } from '~/utils/helpers'
import useIsMobileView from '~/hooks/useIsMobile'
import CalendarModal from '~/components/modals/calendar/CalendarModal'

interface Props {
  date: Date,
  changeDate: (newDate: Date) => void,
  allowedDates?: string[] | null
}

const CalendarTab: React.FC<Props> = ({
  date,
  changeDate,
  allowedDates,
}) => {
  const { isMobileView } = useIsMobileView()
  const [isCalendarModalOpened, setIsCalendarModalOpened] = useState<boolean>(false)
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(false)
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (allowedDates) {
      const currentIndexOfDate = allowedDates.findIndex(item => {
        const temp = new Date(item)
        return temp.getTime() === date.getTime()
      })
      if (currentIndexOfDate === 0) {
        setIsPreviousButtonDisabled(true)
      } else if (currentIndexOfDate === allowedDates.length - 1) {
        setIsNextButtonDisabled(true)
      }
    }
  }, [date, allowedDates])

  const onClickNextDay = () => {
    if (!allowedDates) {
      const day = new Date(date);
      const nextDay = new Date(day);
      const result = nextDay.setDate(day.getDate() + 1)
      // const day = date.getDate()
      changeDate(new Date(result))
    } else {
      // Note: если дата есть - то нужно узнайть где именно она лежит в массиве
      const currentIndexOfDate = allowedDates.reverse().findIndex(item => {
        const temp = new Date(item)
        return temp.getTime() === date.getTime()
      })

      if (currentIndexOfDate !== allowedDates.length - 1) {
        setIsPreviousButtonDisabled(false)
        changeDate(new Date(allowedDates[currentIndexOfDate + 1]))
      } else {
        setIsNextButtonDisabled(true)
      }
    }
  }

  const onClickPreviousDay = () => {
    if (!allowedDates) {
      const day = new Date(date);
      const nextDay = new Date(day);
      const result = nextDay.setDate(day.getDate() - 1)
      changeDate(new Date(result))
    } else {
      // Note: если дата есть - то нужно узнайть где именно она лежит в массиве
      const currentIndexOfDate = allowedDates.findIndex(item => {
        const temp = new Date(item)
        return temp.getTime() === date.getTime()
      })

      if (currentIndexOfDate !== 0) {
        setIsNextButtonDisabled(false)
        changeDate(new Date(allowedDates[currentIndexOfDate - 1]))
      } else {
        setIsPreviousButtonDisabled(true)
      }
    }
  }

  const _formatDate = () => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const tempDateString = DateTime.utc(year, month, day).toISO().substring(0, 10)
    const formattedWeek = formatDate(tempDateString, 'cccc').toLowerCase()
    const formattedYear = formatDate(tempDateString, 'DDD').slice(0, -3)

    return isMobileView ? `${day.toString().length === 2 ? day : `0${day}`}.${month.toString().length === 2 ? month : `0${month}`}, ${formattedWeek}` : `${formattedYear}, ${formattedWeek}`
  }

  const defaultStylesButton = {
    padding: '6px',
    width: '26px',
    height: '26px',
    minWidth: '26px',
  }

  return (
    <div className={s.calendarTab}>
      <Button
        buttonType='text'
        onClick={onClickPreviousDay}
        sx={defaultStylesButton}
        disabled={isPreviousButtonDisabled}
      >{ '<' }</Button>
      <div onClick={() => setIsCalendarModalOpened(true)}>
        <Typography variant='body3' sx={{
          fontSize: '1.125rem',
          fontWeight: 500,
          lineHeight: '26px',
        }}>{ _formatDate() }</Typography>
      </div>
      <Button
        buttonType='text'
        onClick={onClickNextDay}
        sx={defaultStylesButton}
        disabled={isNextButtonDisabled}
      >{ '>' }</Button>
      <CalendarModal
        date={date}
        isOpened={isCalendarModalOpened}
        onClose={() => setIsCalendarModalOpened(false)}
        changeDate={changeDate}
        allowedDates={allowedDates}
      />
    </div>
  )
}

export default CalendarTab
