import { DateTime } from 'luxon'
import React from 'react'
import Calendar, { CalendarProps } from 'react-calendar'

import '~/components/_uikit/CustomCalendar/CustomCalendar.css'

type Props = CalendarProps & {
  modalVersion?: boolean,
  allowedDates?: string[] | null
}

const CustomCalendar: React.FC<Props> = (props) => {
  
  return (
    <Calendar
      className={props.modalVersion ? 'react-calendar-in-modal' : ''}
      value={props.value}
      onChange={props.onChange}
      next2Label={null}
      prev2Label={null}
      locale='ru'
      tileDisabled={({ date }) => {
        if (props.allowedDates) {
          const day = date.getDate()
          const month = date.getMonth() + 1
          const year = date.getFullYear()
      
          const tempDateString = DateTime.utc(year, month, day).toISO().substring(0, 10)
          
          if (props.allowedDates.includes(tempDateString)) {
            return false
          }
          
          return true
        }
        return false
      }}
    />
  )
}

export default CustomCalendar

