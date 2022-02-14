import { makeAutoObservable } from 'mobx'

// Types
import RootStore from '~/store/modules/RootStore';
// Services
import { fetchSpecialtiesService } from '~/services/specialties';
import { ISpecialityEntity, ISpecialityPayload } from '~/store/types/specialties';

/**
 * Note: Класс предназначенный для работы с сущностью "специальность"
 *  - получение специальностей и выбор текущей специальности
 */
class Speciality {
  rootStore!: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  // ---------------------------- Speciality Entity ---------------------------- >>
  currentSpeciality: ISpecialityEntity | null = null

  specialities: ISpecialityEntity[] = []

  setCurrentSpeciality(payload: number) {
    const foundSpec = this.specialities.find(item => {
      return item.idSpecialty === payload
    })
    if (foundSpec) {
      this.currentSpeciality = foundSpec
    } else {
      this.currentSpeciality = null
    }
  }

  setSpecialties(payload: ISpecialityEntity[]) {
    this.specialities = payload
  }

  fetchSpecialities(payload: ISpecialityPayload) {
    this.rootStore.systemStore.loadingStart()
    return this.rootStore.egisErrorStore.checkCallbackForEgisError(
      payload,
      fetchSpecialtiesService,
      '/appointment/hospital' // ToDo - тут может быть логика вычисления этой функции, тогда немного переписать на проверку isFunction
    )
      .then((data) => {
        if (data && data.response && data.response.length > 0) {
          this.setSpecialties(data.response[0].data)
        }
      })
      .catch(e => console.log(e))
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }
}

export default Speciality