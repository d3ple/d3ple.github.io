import { post } from "~/utils/services/api-helpers"
import { baseEndpointEgis } from "~/utils/services/constants"
import { ISpecialityPayload, ISpecialityRequest } from "~/store/types/specialties"

export const fetchSpecialtiesService = (payload: ISpecialityPayload) => {
  return post<typeof payload, ISpecialityRequest>(`${baseEndpointEgis}/v1/specialties`, payload)
}