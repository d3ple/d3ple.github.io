import { AxiosResponse } from "axios"
import { IRequestWithStatusCode, ResponseStatusCode } from "~/store/types/request"

export const egisErrorHandler = async <T, D>(
  payload: T,
  callback: (payload: T) => Promise<AxiosResponse<IRequestWithStatusCode<D>, T>>): Promise<{ data: IRequestWithStatusCode<D>, isEgisError: boolean } | undefined> => {
  try {
    const { data } = await callback(payload)
  
    if (data.code === ResponseStatusCode.EGISError) {
      return Promise.resolve({
        data: data,
        isEgisError: true,
      })
    } else {
      return Promise.resolve({
        data: data,
        isEgisError: false,
      })
    }
  } catch (error) {
  }
}