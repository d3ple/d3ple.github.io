import { IRequestWithStatusCode } from "~/store/types/request"

/**
 * Note: Сущность пациента
 */
export enum Sex {
  male = 1,
  female = 2
}

export interface INewPatientPayload {
  id_region: number,
  fname: string,
  lname: string,
  mname?: string,
  birthday: string, // dd.mm.yyyy
  insurance_policy: string,
  id_gender: Sex
}

/**
 * Note: Нам не нужны для валидации формы регион, но нужно соглашение с политикой конфиденциальности
 */
export type INewPatientForm = Omit<INewPatientPayload, 'id_region'> & { personal?: boolean }


/**
 * Note: Типизация post
 */

export type INewPatientEntityResponse = {
  idUserData: number,
}

export type INewPatientEntity = Omit<INewPatientForm, 'personal'> & INewPatientEntityResponse

export type INewPatientResponse = IRequestWithStatusCode<INewPatientEntityResponse>