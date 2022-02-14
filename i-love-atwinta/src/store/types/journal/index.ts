import { IRequestWithStatusCode } from '~/store/types/request'

export interface IJournalTicketData {
  id: number,
  id_hospital: number,
  address: string,
  idTicket: string,
  idDoctor: number,
  idJournalTicket: string,
  hospitalName: string,
  doctorName: string,
  idSpecialty: number,
  specialtyName: string,
  idUserData: number,
  idPatient: number,
  idPatientExternal: number,
  patientName: string,
  dt: string, // yyyy-mm-dd
  value: string, // hh:mm
  isRefused: 0 | 1, // Отмененный или нет (1/0)
  isClosed: 0 | 1, // Закрыт или нет слот (1/0)
  status: 0 | 1 // 0.В обработке 1.Подтвержден 2.Отменен больницей
}

export interface IJournalTicket {
  id: number,
  title: string, // dd.mm.yyyy
  data: IJournalTicketData[]
}

export interface IJournalPayload {
  id_user_data: number
}

export type IJournalResponse = IJournalTicket[]