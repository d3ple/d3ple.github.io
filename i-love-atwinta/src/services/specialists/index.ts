import { post } from "~/utils/services/api-helpers"
import { baseEndpointEgis } from "~/utils/services/constants"
import { ISpecialistPayload, ISpecialistRequest } from "~/store/types/specialist"

export const fetchSpecialistsService = (payload: ISpecialistPayload) => {
  return post<typeof payload, ISpecialistRequest>(`${baseEndpointEgis}/v1/doctors`, payload)
}