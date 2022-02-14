import { IRequestWithStatusCode } from '~/store/types/request'

export interface IAppointmentTicketPayload {
  id_region: number,
  id_user_data: number,
  id_doctor: number,
  id_hospital: number,
  id_specialty: number,
  start_date: string,
  end_date?: string
}

export interface IAppointmentTicketTimeSlot {
  id: number,
  idTicket: string, // uuid
  isClosed: 0 | 1, // // Закрыт или нет слот (1/0)
  value: string, // время записи hh:mm:mm
  // id: number,
  // idTicket: string,
  // value: number, // Время начала (hh:mm)
  // endTime: number, // Время окончания (hh:mm)
  // price: number,
  // description: string,
  // isClosed: 0 | 1, // Закрыт или нет слот (1/0)
  // price2: number, // Стоимость вторичного приема
  // comment: string
}

export interface IAppointmentTicketEntity {
  id: number,
  value: string, // дата: 2022-02-03
  timeSlots: IAppointmentTicketTimeSlot[]
}

export type IAppointmentTicketResponse = IRequestWithStatusCode<IAppointmentTicketEntity[]>

export interface IAppointmentCreatePayload {
  id_region: number,
  id_user_data: number,
  id_doctor: number,
  id_hospital: number,
  id_specialty: number,
  id_ticket_external: string,
  dt: string // dd.mm.yyyy hh24:mi
}

export type IAppointmentCreateResponse = IRequestWithStatusCode<{ message: string }>

export interface IAppointmentCancelPayload {
  id_doctor: number,
  id_journal_ticket: string,
  id_ticket_external: string
}

export type IAppointmentCancelResponse = IRequestWithStatusCode<{ message: string }>