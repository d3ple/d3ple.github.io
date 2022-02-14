import { makeAutoObservable } from 'mobx'
import RootStore from '~/store/modules/RootStore';

import { cancelAppointmentService, createAppointmentService, fetchAvailableTicketsService } from '~/services/appointment';
import {
  IAppointmentCancelPayload,
  IAppointmentCreatePayload,
  IAppointmentTicketEntity,
  IAppointmentTicketPayload,
  IAppointmentTicketTimeSlot
} from '~/store/types/appointment';
import { ResponseStatusCode } from '~/store/types/request';

/**
 * Note: Стор предназначенный для работы c процессом записи на приём
 *  - запросы на получение талонов, обработка логики записи
 */

type TicketDates = string

class Appointment {
  rootStore!: RootStore

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this);
    if (rootStore) {
      this.rootStore = rootStore;
    }
  }

  // ---------------------------- Appointment Process ---------------------------- >>
  availableTickets: IAppointmentTicketEntity[] = []
  currentTicketTimeSlot: IAppointmentTicketTimeSlot | null = null
  chosenEgisFormattedDate: string | null = null

  get currentTicket(): IAppointmentTicketEntity | null {
    const foundTicket = this.availableTickets.find(ticket => {
      return ticket.value === this.chosenEgisFormattedDate
    })
    return foundTicket ? foundTicket : null
  }

  get currentlyTicketTimeSlots(): IAppointmentTicketTimeSlot[] {
    if (this.currentTicket) {
      return this.currentTicket.timeSlots
    }
    return []
  }

  get ticketDates(): TicketDates[] | null {
    if (this.availableTickets && this.availableTickets.length) {
      return this.availableTickets.map(item => item.value)
    }
    return null
  }
  
  setChosenEgisFormattedDate(formattedDate: string) {
    this.chosenEgisFormattedDate = formattedDate
  }

  setAvailableTickets(tickets: IAppointmentTicketEntity[]) {
    this.availableTickets = tickets
  }

  setCurrentTicketTimeSlot(ticket: IAppointmentTicketTimeSlot) {
    this.currentTicketTimeSlot = ticket
  }

  // Note: метод получение доступных "тикетов" для записи
  fetchAvailableTickets(payload: IAppointmentTicketPayload) {
    this.rootStore.systemStore.loadingStart()
    return this.rootStore.egisErrorStore.checkCallbackForEgisError(
      payload,
      fetchAvailableTicketsService,
      '/appointment/specialist/person'
    )
      .then((data) => {
        if (data && data.response) {
          this.setAvailableTickets(data.response)
        }
        return data
      })
      .catch((e) => console.log(e))
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }

  // Note: метод записи к врачу
  createAppointment(payload: IAppointmentCreatePayload) {
    this.rootStore.systemStore.loadingStart()
    // Намеренно убрал ошибку егиса
    return createAppointmentService(payload)
      .then(({ data }) => {
        if (data.code !== ResponseStatusCode.EGISError) {

          const filteredTicketsWithoutAssignedOne = this.availableTickets.map(item => {
            if (item.value === this.chosenEgisFormattedDate) {
              return {
                ...item,
                timeSlots: item.timeSlots.filter(item => {
                  return item.idTicket !== payload.id_ticket_external
                })
              }
            }
            return item
          })

          this.setAvailableTickets(filteredTicketsWithoutAssignedOne)
        }
        return data
      })
      .catch((e) => console.log(e))
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }

  // Note: метод отмены записи
  cancelAppointment(payload: IAppointmentCancelPayload) {
    this.rootStore.systemStore.loadingStart()
    return this.rootStore.egisErrorStore.checkCallbackForEgisError(
      payload,
      cancelAppointmentService
    )
      .then(() => {
        this.rootStore.journalStore.setJournalTicketData(
          this.rootStore.journalStore.appointmentsItems.filter(item => {
            return item.idTicket !== payload.id_ticket_external
          })
        )
      })
      .catch((e) => console.log(e))
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }
}

export default Appointment