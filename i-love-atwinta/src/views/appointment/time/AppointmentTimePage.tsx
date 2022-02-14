import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrentChosenHospital from '~/components/common/CurrentChosenHospital/CurrentChosenHospital'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'

// Styles
import s from '~/views/appointment/time/AppointmentTimePage.module.scss'
// Components
import ScheduleAppointmentSection from '~/components/views/appointment/ScheduleAppointmentSection/ScheduleAppointmentSection'
// Hooks
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'
// Utils
import { formatDate } from '~/utils/helpers'

interface Props {}

const AppointmentTimePage: React.FC<Props> = observer(() => {
  const [date, setDate] = useState<Date>(new Date())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialFormattedDate, setInitialFormattedDate] = useState<string>('')
  const [formattedDateReadable, setFormattedDateReadable] = useState<string>('')
  const [formattedDateWeek, setFormattedDateWeek] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  const store: RootStore = useStore()
  
  const changeDate = (date: Date) => {
    setDate(date)
  }

  // ========================================Effects-START=======================================
  useEffect(() => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    setInitialFormattedDate(`${day.toString().length === 2 ? day : `0${day}`}.${month.toString().length === 2 ? month : `0${month}`}.${year}`)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const tempDateString = DateTime.utc(year, month, day).toISO().substring(0, 10)

    store.appointmentStore.setChosenEgisFormattedDate(
      `${year}-${month.toString().length === 2 ? month : `0${month}`}-${day.toString().length === 2 ? day : `0${day}`}`
    )

    setFormattedDateReadable(formatDate(tempDateString, 'cccc'))

    setFormattedDateWeek(formatDate(tempDateString, 'DDD'))
  }, [date, store.appointmentStore])

  useEffect(() => {
    const hasData = store.regionStore.currentRegion && store.regionStore.currentRegion.id &&
      store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData &&
      store.specialistStore.currentSpecialist && store.specialistStore.currentSpecialist.idDoctor &&
      store.hospitalStore.currentHospital && store.hospitalStore.currentHospital.idHospital &&
      store.specialityStore.currentSpeciality && store.specialityStore.currentSpeciality.idSpecialty;

    const tickets = store.appointmentStore.availableTickets
    if (
      initialFormattedDate && hasData 
    ) {
      store.appointmentStore.fetchAvailableTickets({
        id_region: store.regionStore.currentRegion?.id as number,
        id_user_data: store.patientStore.currentPatient?.idUserData as number,
        id_doctor: store.specialistStore.currentSpecialist?.idDoctor as number,
        id_hospital: store.hospitalStore.currentHospital?.idHospital as number,
        id_specialty: store.specialityStore.currentSpeciality?.idSpecialty as number,
        start_date: initialFormattedDate
      })
        .then((data) => {
          if (data && data.response && data.response.length !== 0) {
            setDate(new Date(data.response[data.response.length - 1].value)) // берётся последний элемент (он же ближайшая запись)
          }
        })
    } else if (hasData && tickets.length !== 0) {
      setDate(new Date(tickets[tickets.length - 1].value)) // берётся последний элемент (он же ближайшая запись)
    } 
    else if (!hasData) {
      navigate('/new-patient', { replace: true })
    }
  }, [
    store.regionStore,
    store.patientStore,
    store.specialistStore,
    store.hospitalStore,
    store.specialityStore,
    store.appointmentStore,
    initialFormattedDate,
    navigate
  ])
  // ========================================Effects-END=======================================

  return (
    <>
      <div className={s.layoutCurrentHospital}>
        <CurrentChosenHospital
          withSpecialistInfo
        />
      </div>
      <div className={s.layoutAppointmentSchedule}>
        <ScheduleAppointmentSection
          date={date}
          changeDate={changeDate}
          formattedDate={formattedDateReadable}
          formattedDateWeek={formattedDateWeek}
        />
      </div>
    </>
  )
})

export default AppointmentTimePage
