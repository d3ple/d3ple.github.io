import React, { ChangeEvent, memo, useState } from 'react'

import BaseModal from '~/components/modals/BaseModal'
import CustomCalendar from '~/components/_uikit/CustomCalendar/CustomCalendar'

interface Props {
  date: Date,
  isOpened: boolean,
  onClose: () => void,
  changeDate: (newDate: Date) => void,
  allowedDates?: string[] | null
}

const CalendarModal: React.FC<Props> = memo(({
  date,
  isOpened,
  onClose,
  changeDate,
  allowedDates
}) => {
  const [localDate, setLocalDate] = useState<Date>(date)

  const onConfirm = () => {
    changeDate(localDate)
    onClose()
  }

  return (
    <BaseModal
      isOpened={isOpened}
      textClose='Отменить'
      textConfirm='Подтвердить'
      onClose={onClose}
      onConfirm={onConfirm}
      hideCloseButton
    >
      <CustomCalendar
        modalVersion
        value={localDate}
        onChange={
          /* eslint-disable-next-line */
          (value: Date, event: ChangeEvent<HTMLInputElement>) => setLocalDate(value)
        }
        allowedDates={allowedDates}
      />
    </BaseModal>
  )
})

CalendarModal.displayName = 'CalendarModal'

export default CalendarModal
