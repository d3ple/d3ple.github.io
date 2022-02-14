import { useStore } from "~/hooks/useStore"

import RootStore from "~/store/modules/RootStore"

export const useJournalAppointements = () => {
  const store: RootStore = useStore()

  const passedAppointments = store.journalStore.currentlyDisplayedPassedJournalItems
  const upcomingAppointments = store.journalStore.upcomingJournalItems

  return {
    passedAppointments,
    upcomingAppointments
  }
}