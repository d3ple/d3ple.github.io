import { IHospitalPayload, IHospitalResponse } from "~/store/types/hospital"
import { post } from "~/utils/services/api-helpers"
import { baseEndpointEgis } from "~/utils/services/constants"

export const fetchHospitalsService = (payload: IHospitalPayload) => {
  return post<typeof payload, IHospitalResponse>(`${baseEndpointEgis}/v1/hospitals`, payload)
}