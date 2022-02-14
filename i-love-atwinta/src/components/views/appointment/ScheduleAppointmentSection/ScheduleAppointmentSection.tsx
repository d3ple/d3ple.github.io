import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

// Components
import Heading from '~/components/typography/Heading'
import CurrentAvailableAppointments from './CurrentAvailableAppointments/CurrentAvailableAppointments'
import CustomCalendar from '~/components/_uikit/CustomCalendar/CustomCalendar'
import CalendarTab from '~/components/_uikit/CalendarTab/CalendarTab'
import AdditionalHospitals from '~/components/common/AdditionalHospitals/AdditionalHospitals'
import NoFountEntity from '~/components/common/NoFoundEntity/NoFountEntity'
// Styles
import s from '~/components/views/appointment/ScheduleAppointmentSection/ScheduleAppointmentSection.module.scss'
// Hooks
import useIsTabletopView from '~/hooks/useIsTabletop'
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props {
  date: Date,
  changeDate: (value: Date) => void,
  formattedDate: string,
  formattedDateWeek: string,
}

const ScheduleAppointmentSection: React.FC<Props> = observer(({
  date,
  formattedDate,
  formattedDateWeek,
  changeDate,
}) => {
  const store: RootStore = useStore()
  const navigate = useNavigate()
  const allowedDates = store.appointmentStore.ticketDates
  const currentlyTicketTimeSlots = store.appointmentStore.currentlyTicketTimeSlots
  const hospitals = store.hospitalStore.additionalHospitals

  const { isTabletopAndBelow } = useIsTabletopView()

  const changeHospital = (id: number) => {
    store.hospitalStore.setCurrentHospital(id)
    navigate('/appointment/specialist/speciality', { replace: true })
  }
  
  return (
    <>
      <div className={s.scheduleWrapper}>
        <aside className={s.scheduleSection}>
          <Heading type='h2'>Расписание работы:</Heading>

          {
            !isTabletopAndBelow &&
            <div className={s.scheduleCurrentDateContainer}>
              <div>
                <Typography variant='dateText'>{ formattedDateWeek }</Typography>
              </div>
              <div>
                <Typography variant='dateText'>{ formattedDate }</Typography>
              </div>
            </div>
          }
          {
            isTabletopAndBelow ?
            <div className={s.calendarTabWrapper}>
              <CalendarTab 
                date={date}
                changeDate={changeDate}
                allowedDates={allowedDates}
              />
            </div>
            :
              <CustomCalendar
                value={date}
                onChange={
                  /* eslint-disable-next-line */
                  (value: Date, event: ChangeEvent<HTMLInputElement>) => changeDate(value)
                }
                allowedDates={allowedDates}
              />
          }
        </aside>

        <section className={s.scheduleCardsWrapper}>
          {
            currentlyTicketTimeSlots.length !== 0 ? 
              <CurrentAvailableAppointments
                tickets={currentlyTicketTimeSlots}
              />
            :
              <div className={s.noFoundEntity}>
                <NoFountEntity
                  hideControls
                  title={'нет приёма для записей в выбранный день'.toUpperCase()}
                  subtitle={'Попробуйте выбрать другую ближайшую дату'}
                  onClick={goToExternalService}
                />
              </div>

          }
        </section>
        <section className={s.additionalHospitals}>
          <AdditionalHospitals
            hospitals={hospitals}
            onClick={changeHospital}
          />
        </section>

      </div>
    </>
  )
})

export default ScheduleAppointmentSection
