import { AxiosResponse } from "axios"
import { post } from "~/utils/services/api-helpers"

// Types and Constants
import { INewPatientPayload, INewPatientResponse } from "~/store/types/patient"
import { baseEndpointEgis } from "~/utils/services/constants"


export const createPatientService = (payload: INewPatientPayload): Promise<AxiosResponse<INewPatientResponse, typeof payload>> => {
  return post<typeof payload, INewPatientResponse>(`${baseEndpointEgis}/v1/hospital/patient/create_with_check`, payload)
}