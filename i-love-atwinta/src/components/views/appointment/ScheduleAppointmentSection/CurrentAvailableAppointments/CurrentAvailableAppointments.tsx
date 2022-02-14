import React, {
  ReactElement,
  useState
} from 'react'
import { observer } from 'mobx-react-lite'

// Types
import { IAppointmentCreatePayload, IAppointmentTicketTimeSlot } from '~/store/types/appointment'
// Components

import AppointmentTimeCard from '~/components/cards/time/AppointmentTimeCard'
import AppointmentConfirmModal from '~/components/modals/appointment/AppointmentConfirmModal'
import SuccessModal from '~/components/modals/SuccessModal'
// Styles
import s from '~/components/views/appointment/ScheduleAppointmentSection/CurrentAvailableAppointments/CurrentAvailableAppointments.module.scss'
import RootStore from '~/store/modules/RootStore'
import { useStore } from '~/hooks/useStore'
import { ResponseStatusCode } from '~/store/types/request'
import AppointmentErrorModal from '~/components/modals/appointment/AppointmentErrorModal'

interface Props {
  tickets: IAppointmentTicketTimeSlot[]
}

const CurrentAvailableAppointments: React.FC<Props> = observer(({
  tickets
}) => {
  const store: RootStore = useStore()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const isErrorOnAssign = store.egisErrorStore.errorOnAssign.isError
  const errorOnAssignText = store.egisErrorStore.errorOnAssign.errorMessage

  const formalizeAppearedErrorInModal = (errorMessage: string) => {
    store.egisErrorStore.errorOnAssign.setErrorMessage(errorMessage)
    store.egisErrorStore.errorOnAssign.setIsError(true)
  }
  const resetAppearedError = () => store.egisErrorStore.errorOnAssign.reset()

  const appointOnTime = (externalTicketTimeSlot: IAppointmentTicketTimeSlot) => {
    store.appointmentStore.setCurrentTicketTimeSlot(externalTicketTimeSlot)
    setIsConfirmModalOpen(true)
  }

  const handleConfirm = (payload: IAppointmentCreatePayload) => {
    store.appointmentStore.createAppointment(payload)
      .then((data) => {
        if (data && data.code !== ResponseStatusCode.EGISError) {
          setIsConfirmModalOpen(false)
          handleOpenSuccess()
        } else if (data && data.message) {
          setIsConfirmModalOpen(false)
          formalizeAppearedErrorInModal(data.message)
        }
      })
  }

  const handleCloseConfirm = () => {
    setIsConfirmModalOpen(false)
  }

  const handleOpenSuccess = () => {
    setIsSuccessModalOpen(true)
  }

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false)
  }

  // eslint-disable-next-line
  const appointmentCards: ReactElement<typeof AppointmentTimeCard>[] = tickets.map((data) => {
    return <AppointmentTimeCard
      {...data}
      key={data.id}
      onClick={() => appointOnTime(data)}
    />
  })

  return (
    <div className={s.cardsContainer}>
      { appointmentCards }
      <AppointmentConfirmModal
        isOpened={isConfirmModalOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirm}
      />
      <AppointmentErrorModal
        isOpened={isErrorOnAssign}
        onClose={resetAppearedError}
        message={errorOnAssignText}
      />
      <SuccessModal
        isOpened={isSuccessModalOpen}
        onClose={handleCloseSuccess}
      />
    </div>
  )
})

export default CurrentAvailableAppointments
