import { makeAutoObservable } from 'mobx'

// Types
import RootStore from '~/store/modules/RootStore';
import { ISpecialistPayload } from '~/store/types/specialist';
import { fetchSpecialistsService } from '~/services/specialists';
import { ISpecialistEntity } from '~/store/types/specialist';
// Stores
import Pagination from '~/store/modules/helpers/PaginationStore';

/**
 * Note: Класс предназначенный для работы с сущностью "специалиста(врача)"
 *  - получение врачей и выбор текущего врача 
 */
class Specialist {
  rootStore!: RootStore

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this);
    if (rootStore) {
      this.rootStore = rootStore;
    }
  }

  // ---------------------------- Specialist Entity ---------------------------- >>
  specialists: ISpecialistEntity[] = []
  currentSpecialist: ISpecialistEntity | null = null
  currentSpecialistSpeciality = ''
  pagination: Pagination = new Pagination()
  withPagination = false

  setSpecialist(specialist: ISpecialistEntity) {
    this.currentSpecialistSpeciality = this.rootStore.specialityStore.currentSpeciality ? this.rootStore.specialityStore.currentSpeciality.name : ''
    this.currentSpecialist = specialist
  }

  setSpecialists(specialists: ISpecialistEntity[]) {
    this.specialists = specialists
  }

  setWithPagination(payload: boolean) {
    this.withPagination = payload
  }

  get displayedSpecialists() {
    if (this.withPagination) {
      return this.specialists.slice(
        0,
        this.pagination.itemsDisplayedOnPage * this.pagination.currentPage
      )
    }
    return this.specialists
  }

  fetchSpecialists(payload: ISpecialistPayload) {
    this.rootStore.systemStore.loadingStart()
    return this.rootStore.egisErrorStore.checkCallbackForEgisError(
      payload,
      fetchSpecialistsService,
      '/appointment/specialist/speciality'
    )
      .then((data) => {
        if (data && data.response) {
          this.setSpecialists(data.response)
          this.pagination.setItemsCount(data.response.length)
          this.pagination.setItemsDisplayedOnPage(3)
        }
      })
      .catch((e) => console.log(e))
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }
}

export default Specialist