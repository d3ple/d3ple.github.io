import { makeAutoObservable } from 'mobx'
import { sortBy } from 'lodash'

import { fetchJournalService } from '~/services/journal';
import RootStore from '~/store/modules/RootStore'
import {
  IJournalPayload,
  IJournalTicket,
  IJournalTicketData
} from '~/store/types/journal';
import Pagination from '~/store/modules/helpers/PaginationStore';


/**
 * Note: В данном сторе хранится информация о журнале записей
 */
class Journal {
  rootStore!: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  // ---------------------------- Journal ---------------------------- >>
  journalItems: IJournalTicket[] = []
  appointmentsItems: IJournalTicketData[] = []
  pagination: Pagination = new Pagination()

  setJournalItems(payload: IJournalTicket[]) {
    this.journalItems = payload
  }

  setJournalTicketData(payload: IJournalTicketData[]) {
    this.appointmentsItems = sortBy(
      payload
      ,
      (journalItem) => {
        return new Date(`${journalItem.dt} ${journalItem.value}`).getTime()
      })
  }

  get upcomingJournalItems(): IJournalTicketData[] {
    const now = new Date().getTime()

    return this.appointmentsItems.filter(journalItem => {
      const journalTimeInMilliseconds = new Date(`${journalItem.dt} ${journalItem.value}`).getTime()
      return journalTimeInMilliseconds > now // оставить те, что будут в будущем
    })
  }

  get passedJournalItems(): IJournalTicketData[] {
    const now = new Date().getTime()

    const filteredAppointmentItems = this.appointmentsItems.filter(journalItem => {
      const journalTimeInMilliseconds = new Date(`${journalItem.dt} ${journalItem.value}`).getTime()
      return journalTimeInMilliseconds <= now // оставить те, что прошли
    })
    this.pagination.setItemsCount(filteredAppointmentItems.length)

    return filteredAppointmentItems
  }

  get currentlyDisplayedPassedJournalItems(): IJournalTicketData[] {
    return this.passedJournalItems.slice(
      this.pagination.offset,
      this.pagination.itemsDisplayedOnPage * this.pagination.currentPage
    )
  }

  // get setJournalItemsByDate(payload: IJournalTicket[]) {
  //   this.journalItems
  // }

  fetchJournal(payload: IJournalPayload) {
    this.rootStore.systemStore.loadingStart()
    return fetchJournalService(payload)
      .then(({ data }) => {
        if (data) {
          this.setJournalItems(data)
          this.setJournalTicketData(data.map(item => item.data).flat())
          this.pagination.setItemsCount(data.length)
          // this.pagination.setItemsDisplayedOnPage(5)
        }
      })
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }
}

export default Journal