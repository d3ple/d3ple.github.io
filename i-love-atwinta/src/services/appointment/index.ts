import { post } from "~/utils/services/api-helpers"

import { baseEndpointEgis } from "~/utils/services/constants"
import {
  IAppointmentCancelPayload,
  IAppointmentCancelResponse,
  IAppointmentCreatePayload,
  IAppointmentCreateResponse,
  IAppointmentTicketPayload,
  IAppointmentTicketResponse
} from "~/store/types/appointment"

// Note: Сервис получение талонов
export const fetchAvailableTicketsService = (payload: IAppointmentTicketPayload) => {
  return post<typeof payload, IAppointmentTicketResponse>(`${baseEndpointEgis}/v1/tickets`, payload)
}

// Note: Сервис записи к врачу
export const createAppointmentService = (payload: IAppointmentCreatePayload) => {
  return post<typeof payload, IAppointmentCreateResponse>(`${baseEndpointEgis}/v1/ticket/accept`, payload)
}

// Note: Сервис отмены записи к врачу
export const cancelAppointmentService = (payload: IAppointmentCancelPayload) => {
  return post<typeof payload, IAppointmentCancelResponse>(`${baseEndpointEgis}/v1/ticket/refuse`, payload)
}