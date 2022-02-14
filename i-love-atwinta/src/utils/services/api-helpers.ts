import api from "~/utils/services/api"
import { AxiosResponse } from "axios"

// Первый аргумент в дженерике будет являться тип тела для запроса
// второй аргумент в дженерике - это тип ответа
export const get = <T, D = never>(url: string, payload?: D) => {
  return api.get<T>(url, payload ? { params: payload } : undefined)
}

export const post = <T, D>(url: string, payload: T) => {
  return api.post<D, AxiosResponse<D, T>, T>(url, payload)
}