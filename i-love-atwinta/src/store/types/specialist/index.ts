import { IRequestWithStatusCode } from "~/store/types/request"

export interface ISpecialist {
  name: string,
  speciality: string,
}

export interface ISpecialistPayload {
  id_region:	number,
  id_user_data:	number,
  id_specialty:	number,
}

export interface ISpecialistEntity {
  idDoctor: number,
  idDoctorExternal: string,
  lname: string,

  // id: number,
  // surname: string,
  // name: string,
  // patronymic: string,
  // firstFreeDt: string,
  // degree: string,
  // min_price: number,
  // specialtyName: string,
  // cntTickets: number,
  // Grade: number,
  // Review: string,
  // achievement: string,
  // ach_is_shown: 0 | 1, // показывать ли достижения
  // is_visiting: 0 | 1, // Можно ли вызвать врача на дом да/нет
  // feedbacks_cnt: number, // количество отзывов
  // services: [
  //   {
  //     name: string,
  //     price: number
  //   }
  // ],
  // is_offline: 0, // признак оффлайновости доктора да/нет = 1/0
  // phone_doctor: string,
  // callActive: 0 | 1 // если 1 то звоним если 0 то проваливаемся в тикеты
}

export type ISpecialistRequest = IRequestWithStatusCode<ISpecialistEntity[]>