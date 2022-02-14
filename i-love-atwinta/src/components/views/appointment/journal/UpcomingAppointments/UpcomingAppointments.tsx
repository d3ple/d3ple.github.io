import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'

// Components
import JournalAppointmentCard from '~/components/cards/journal/JournalAppointmentCard'
// Styles
import s from '~/components/views/appointment/journal/UpcomingAppointments/UpcomingAppointments.module.scss'
// Hooks
import { useJournalAppointements } from '~/hooks/useJournalAppointements'
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'

interface Props {}

const UpcomingAppointments: React.FC<Props> = observer(({}) => {
  const { upcomingAppointments } = useJournalAppointements()
  const store: RootStore = useStore()

  const handlerObject = {
    onDownload(id: number) {
      console.log(id)
    },
    onCancel(id: number) { // ticketId
      const foundAppointment = store.journalStore.appointmentsItems.find((item) => {
        return item.id === id
      })

      if (foundAppointment) {
        store.appointmentStore.cancelAppointment({
          id_doctor: foundAppointment.idDoctor,
          id_journal_ticket: foundAppointment.idJournalTicket,
          id_ticket_external: foundAppointment.idTicket
        })
      }
    }
  }

  const cards: ReactElement<typeof JournalAppointmentCard>[] = upcomingAppointments.map(journalItem => {
    return <JournalAppointmentCard
      downloadable={handlerObject}
      journalAppointment={journalItem}
      key={journalItem.id}
    />
  })

  return (
    <div className={s.upcomingAppointments}>
      { cards }
    </div>
  )
})

export default UpcomingAppointments
