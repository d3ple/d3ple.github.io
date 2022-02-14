import { INameValue } from "~/store/types/system"

// CONSTANTS FOR REQUESTS ENDPOINT
export const baseEndpoint = process.env.BACKEND_API_ENDPOINT_MAIN
export const baseEndpointEgis = process.env.BACKEND_API_ENDPOINT_EGIS

// VALIDATION MESSAGES IN FORMIK
export const VALIDATION_REQUIRED_MESSAGE = 'Поле обязательно'

export enum AppointmentEntityType {
  HOSPITAL = 'hospital',
  SPECIALIST = 'specialist',
}
// Note: ниже не совсем константы - но меняться они будут редко.
export const LINKS: INameValue[] = [
  { name: 'Пользовательское соглашение', value: 'https://vrach.f.x.eltc.ru/doctor/zapis_k_vrachy.pdf' },
  { name: 'Правила пользования сервисом', value: 'https://vrach.f.x.eltc.ru/doctor/zapis_k_vrachy.pdf' },
  { name: 'Сообщить о проблеме', value: 'https://onlinezdrav.ru/help/' },
]