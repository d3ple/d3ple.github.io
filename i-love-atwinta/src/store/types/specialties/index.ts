import { IRequestWithStatusCode } from '~/store/types/request'

export interface ISpecialityPayload {
  id_region: number,
  id_user_data: number,
  id_hospital: number
}

export interface ISpecialityEntity {
  idSpecialty: number,
  idSpecialtyExternal: number,
  name: string,
}

export type ISpecialityRequest = IRequestWithStatusCode<{
  id: number,
  title: string,
  data: ISpecialityEntity[]
}[]>