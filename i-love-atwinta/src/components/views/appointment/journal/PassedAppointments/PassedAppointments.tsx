import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'

// Components
import JournalAppointmentCard from '~/components/cards/journal/JournalAppointmentCard'
// Styles 
import s from '~/components/views/appointment/journal/PassedAppointments/PassedAppointments.module.scss'
// Hooks
import { useJournalAppointements } from '~/hooks/useJournalAppointements'

interface Props {}

const PassedAppointments: React.FC<Props> = observer(({}) => {
  const { passedAppointments } = useJournalAppointements()

  const handlerObject = {
    onDownload(id: number) {
      console.log(id)
    },
    onCancel(id: number) {
      console.log(id)
    }
  }

  const cards: ReactElement<typeof JournalAppointmentCard>[] = passedAppointments.map(journalItem => {
    return <JournalAppointmentCard
      downloadable={handlerObject}
      journalAppointment={journalItem}
      key={journalItem.id}
    />
  })

  return (
    <div className={s.passedAppointments}>
      { cards }
    </div>
  )
})

export default PassedAppointments
