import { AxiosResponse } from "axios"

import api from "~/utils/services/api"
import { ICitiesInRegionResponse, IRegionsResponse, IRegionWithGeoResponse, IRegionWithGeoPayload } from "~/store/types/regions"
import { baseEndpoint } from "~/utils/services/constants"
import { get, post } from "~/utils/services/api-helpers"

export const fetchRegionsService = () => {
  return get<IRegionsResponse>(`${baseEndpoint}/v6/mo/regions`)
}

export const fetchRegionsCitiesService = (regionId: number): Promise<AxiosResponse<ICitiesInRegionResponse>> => {
  return api.post<ICitiesInRegionResponse>(`${baseEndpoint}/v6/mo/towns`, { 
    idRegion: regionId,
   })
}

export const fetchRegionsGeoDataService = (payload: IRegionWithGeoPayload) => {
  return post<typeof payload, IRegionWithGeoResponse>(`${baseEndpoint}/v6/mo/regions_with_geo`, payload)
}