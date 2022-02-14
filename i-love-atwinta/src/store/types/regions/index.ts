import { IRequestWithStatusCode } from '~/store/types/request'

export type IRegionsResponse = IRequestWithStatusCode<IRegionBrief[]>
export type ICitiesInRegionResponse = IRequestWithStatusCode<ICityBrief[]>
export type IRegionWithGeoResponse = IRequestWithStatusCode<IRegionWithGeo[]>

export interface IRegionBrief {
  id: number,
  name: string,
}

export interface ICityBriefPayload {
  idRegion: number,
}

export interface ICityBrief {
  id: number,
  townName: string,
  idRegion: number,
}

export interface IRegionWithGeoPayload {
  postalCode: string,
}

export interface IRegionWithGeo extends IRegionBrief {
  available: 1 | 0,
  isGeo: 1 | 0
}