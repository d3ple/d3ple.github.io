import { observer } from 'mobx-react-lite'
import React, { 
  useEffect,
  useState
} from 'react'
import { SxProps, Typography } from '@mui/material'

// Components
import BaseModal from '~/components/modals/BaseModal'
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'
// Styles
import s from '~/components/modals/appointment/AppointmentConfirmModal.module.scss'
import { formatDate } from '~/utils/helpers'
import { IAppointmentCreatePayload } from '~/store/types/appointment'

interface Props {
  isOpened: boolean,
  onClose: () => void,
  onConfirm: (payload: IAppointmentCreatePayload) => void,
}

const AppointmentConfirmModal: React.FC<Props> = observer(({
  isOpened = false,
  onClose,
  onConfirm,
}) => {
  const store: RootStore = useStore()
  const [open, setOpen] = useState<boolean>(isOpened)
  const patient = store.patientStore.currentPatient
  const appointmentTicketTime = store.appointmentStore.currentTicketTimeSlot
  const appointmentTicket = store.appointmentStore.currentTicket
  const hospital = store.hospitalStore.currentHospital
  const specialist = store.specialistStore.currentSpecialist
  const speciality = store.specialityStore.currentSpeciality
  const region = store.regionStore.currentRegion
  const time = store.appointmentStore.chosenEgisFormattedDate

  const weekDay = appointmentTicket ?
    formatDate(appointmentTicket.value, 'ccc')
    : ''

  const day = appointmentTicket ?
    formatDate(appointmentTicket.value, 'd')
    : ''

  const month = appointmentTicket ?
    formatDate(appointmentTicket.value, 'LLLL')
    : ''

  const year = appointmentTicket ?
    formatDate(appointmentTicket.value, 'kkkk')
    : ''

  const dateOfYear = `${weekDay.toLowerCase()}, ${day} ${month.toLowerCase()}`

  const doctorSpeciality: string = store.specialistStore.currentSpecialistSpeciality

  const fullNameOfPatient = patient ?
    `${patient.lname} ${patient.fname} ${patient.mname}`
    : ''

  const currentTimeSlot = appointmentTicketTime ?
    appointmentTicketTime.value.slice(0, -3)
    : ''

  const hospitalName = hospital ?
    hospital.organisationName
    : ''

  const hospitalAddress = hospital ?
    hospital.address
    : ''

  const doctorName = specialist ?
    specialist.lname
    : ''

  const commonTypographyRewriteStyles: SxProps = {
    color: '#2D3748',
    fontSize: '1.75rem',
  }

  useEffect(() => {
    setOpen(isOpened)
  }, [isOpened])

  const confirm = () => {
    if (
      time &&
      region && region.id &&
      hospital && hospital.idHospital &&
      patient && patient.idUserData &&
      specialist && specialist.idDoctor &&
      speciality && speciality.idSpecialty &&
      appointmentTicketTime && appointmentTicketTime.idTicket
    ) {
      const date = new Date(time)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      const payload: IAppointmentCreatePayload = {
        id_region: region.id,
        id_user_data: patient.idUserData,
        id_doctor: specialist.idDoctor,
        id_hospital: hospital.idHospital,
        id_specialty: speciality.idSpecialty,
        id_ticket_external: appointmentTicketTime.idTicket,
        dt: `${day.toString().length === 2 ? day : `0${day}`}.${month.toString().length === 2 ? month : `0${month}`}.${year} ${currentTimeSlot}`
      }
      onConfirm(payload)
    }
  }

  return (
    <BaseModal
      isOpened={open}
      onClose={onClose}
      onConfirm={confirm}
    >
      <div className={s.title}>
        <Typography
          variant='subtitle1'
          sx={commonTypographyRewriteStyles}
        >
          Запись к врачу
        </Typography>
      </div>
      <div className={s.userData}>
        <div className={s.dataBlock}>
          <div className={s.dataBlockContainer}>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
                Пациент
              </Typography>
            </div>
            <div>
              <Typography variant='body3'>
                { fullNameOfPatient }
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.dataBlockMultiple}>
          <div className={s.dataBlockContainer}>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
                Дата
              </Typography>
            </div>
            <div>
              <Typography variant='h3'>
                { dateOfYear }
              </Typography>
              <div><Typography variant='h3'>
                { year }
              </Typography></div>
            </div>
          </div>
          <div className={s.dataBlockContainer}>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
                Время приема
              </Typography>
            </div>
            <div>
              <Typography variant='h3'>
                { currentTimeSlot }
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.dataBlock}>
          <div className={s.dataBlockContainer}>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
                Больница
              </Typography>
            </div>
            <div>
              <Typography variant='body3'>
                { hospitalName }
              </Typography>
            </div>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
              { hospitalAddress }
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.dataBlock}>
          <div className={s.dataBlockContainer}>
            <div>
              <Typography variant='small' sx={{ fontWeight: 500 }}>
                Врач { doctorSpeciality }
              </Typography>
            </div>
            <div>
              <Typography variant='body3'>
                { doctorName }
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
})

AppointmentConfirmModal.displayName = 'AppointmentConfirmModal'

export default AppointmentConfirmModal
