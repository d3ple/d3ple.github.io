import { IRequestWithStatusCode } from "../request";

export enum HospitalType {
  PRIVATE = 'private',
  GOVERNMENT = 'government'
}

export interface IHospital {
  address: string,
  idHospital: number,
  idHospitalExternal: number,
  oidHospital: string,
  organisationName: string,
  phones: {
    phone: string | null
  }[]
  // id: number,
  // name: string,
  // organisationName: string,
  // integration: 0 | 1,
  // idTown: 0 | 1,
  // townName: string,
  // idType: number,
  // address: string,
  // isRegional: 0 | 1,
  // available: 0 | 1,
  // area: 0 | 1,
  // discount: number, // Скидка
  // is_oms: 0 | 1, // больница принимает по ОМС
  // is_dms: 0 | 1, // больница принимает по ДМС
  // out_spec: 0 | 1, // если 0 - то в больнице нет такой специальности
  // mainRank: number, // Порядок отображения ЧК на главном экране
  // recRank: number, // Порядок отображения ЧК на экране рекомендаций (не используется)
  // specialtyAppRank: number, // Ранжирование ЧК по специальности
  // is_fav: 0 | 1, // избранная ли больница
  // Grade: number, // средняя оценка
  // is_offline: 0 | 1, // признак наличия у клиники онлайн докторов
  // phones: string[],
  // model_attributes: IHospitalAttributes[]
}

export interface IHospitalPayload {
  id_region: number,
  id_user_data: number,
  id_specialty?: number,
  id_doctor?: number
}

export type IHospitalResponse = IRequestWithStatusCode<IHospital[]> 

interface IHospitalAttributes {
  attribute: string,
  enabled: 0 | 1
}