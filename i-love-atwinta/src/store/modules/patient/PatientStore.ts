import { makeAutoObservable } from 'mobx'

// Note: https://stackoverflow.com/questions/58919016/babel-and-webpack-are-throwing-cant-resolve-regenerator-runtime-runtime
import 'regenerator-runtime/runtime'
// Services
import { createPatientService } from '~/services/patient'
// Types
import {
  INewPatientEntity,
  INewPatientPayload,
} from '~/store/types/patient'
import RootStore from '~/store/modules/RootStore'
import { ResponseStatusCode } from '~/store/types/request'

/**
 * Note: Класс предназначенный для работы с сущностью "пациент"
 *  - создание пациента 
 *  - основная информация о пациенте
 */
class Patient {
  rootStore!: RootStore

  constructor(root: RootStore) {
    makeAutoObservable(this)
    this.rootStore = root
  }

  // ----------------------------------- Current Patient --------------------------------->
  currentPatient: INewPatientEntity | null = null

  setCurrentPatient(patient: INewPatientEntity) {
    // localStorage.setItem('patientData', JSON.stringify(patient))
    this.currentPatient = patient
  }

  createPatient(payload: INewPatientPayload) {
    this.rootStore.systemStore.loadingStart()
    return createPatientService(payload)
      .then((response) => {
        if (response) {
          if (response.data.code === ResponseStatusCode.EGISError) {
            this.rootStore.egisErrorStore.setIsEgisErrorRelatedToAssign(true)
          }
          return response.data
        }
      })
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }

  get currentPatientAge(): number | null {
    if (this.currentPatient) {
      const birthDate = new Date(`${this.currentPatient.birthday.substring(6)}/${this.currentPatient.birthday.substring(3, 5)}/${this.currentPatient.birthday.substring(0, 2)}`)
      const otherDate = new Date();
  
      let years = (otherDate.getFullYear() - birthDate.getFullYear());
  
      if (otherDate.getMonth() < birthDate.getMonth() || 
          otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
          years--;
      }
  
      return years;
    }
    return null
  }

}

export default Patient