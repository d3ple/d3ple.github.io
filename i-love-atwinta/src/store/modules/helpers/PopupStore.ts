import { makeAutoObservable } from 'mobx'
import RootStore from '~/store/modules/RootStore'

/**
 * Note: Класс помощник для упрощения работы с попапами
 */
class Popup {
  rootStore!: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  // ---------------------------- Geolocation Popup ---------------------------- >>
  show = false

  setShow(value: boolean) {
    this.show = value
  }
}

export default Popup