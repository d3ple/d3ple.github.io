import { makeAutoObservable } from 'mobx'

// Services
import { fetchHospitalsService } from '~/services/hospital'
// Helpers
import Pagination from '~/store/modules/helpers/PaginationStore'
// Root Store
import RootStore from '~/store/modules/RootStore'
// Types
import { IHospital, IHospitalPayload } from '~/store/types/hospital'

interface IHospitalFilter {
  government: boolean,
  private: boolean,
  query: string,
}

/**
 * Note: Стор для работы с больницами
 *  - выбор больницы
 *  - смена поликлиники на страницах, косвенно связанных с ними
 *  - фильтрация больниц
 */

class Hospital {
  rootStore!: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  // ---------------------------- Filters ---------------------------- >>
  hospitalsFilter: IHospitalFilter = {
    government: false,
    private: false,
    query: ''
  }
  currentSearchValue = ''
  
  setCurrentSearchValue(value: string) {
    this.currentSearchValue = value
  }

  toggleGovernmentFilter() {
    this.hospitalsFilter.government = !this.hospitalsFilter.government
  }

  togglePrivateFilter() {
    this.hospitalsFilter.private = !this.hospitalsFilter.private
  }

  setQuery(value: string) {
    this.hospitalsFilter.query = value
  }

  // ---------------------------- HospitalList ---------------------------- >>
  hospitalList: IHospital[] = []
  pagination: Pagination = new Pagination()
  
  setHospitalList(hospitals: IHospital[]) {
    this.hospitalList = hospitals
  }
  
  get additionalHospitals() {
    if (this.currentHospital) {
      return this.hospitalList.filter(item => {
        return item.idHospital !== this.currentHospital?.idHospital
      })
    }
    return this.hospitalList
  }

  get currentlyDisplayedHospitals() {
    if (this.hospitalsFilter.query) {
      const tempResult = this.hospitalList
        .filter(item => {
          return item.organisationName.toLowerCase().includes(this.hospitalsFilter.query.toLowerCase())
        })

      this.pagination.setItemsCount(tempResult.length)

      return tempResult.slice(
          this.pagination.offset,
          this.pagination.itemsDisplayedOnPage * this.pagination.currentPage
        )
    }
    this.pagination.setItemsCount(this.hospitalList.length)
    return this.hospitalList.slice(
      this.pagination.offset,
      this.pagination.itemsDisplayedOnPage * this.pagination.currentPage
    )
  }

  fetchHospitals(payload: IHospitalPayload) {
    this.rootStore.systemStore.loadingStart()
    return this.rootStore.egisErrorStore.checkCallbackForEgisError(
      payload,
      fetchHospitalsService,
      '/new-patient'
    )
      .then((data) => {
        if (data && data.response) {
          this.setHospitalList(data.response)
          this.pagination.setItemsCount(data.response.length)
          this.pagination.setItemsDisplayedOnPage(7)
        }
      })
      .catch(e => console.log(e)) 
      .finally(() => {
        this.rootStore.systemStore.loadingEnd()
      })
  }

  // ---------------------------- Hospital ---------------------------- >>
  currentHospital: IHospital | null = null 

  setCurrentHospital(id: number) {
    const foundHospital = this.hospitalList.find(item => {
      return item.idHospital === id
    })
    if (foundHospital) {
      this.currentHospital = foundHospital
    } else {
      this.currentHospital = null
    }
  }
}

export default Hospital