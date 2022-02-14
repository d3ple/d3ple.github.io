import { makeAutoObservable } from 'mobx'
import RootStore from '~/store/modules/RootStore'

class System {
  rootStore!: RootStore

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this);
    if (rootStore) {
      this.rootStore = rootStore;
    }
  }

  // ---------------------------- Loading ---------------------------- >>
  loading = false
  loadingCounter = 0

  incrementLoading() {
    this.loadingCounter += 1
    this.loading = true
  }

  decrementLoading() {
    if (this.loadingCounter > 0) {
      this.loadingCounter -= 1
      if (this.loadingCounter <= 0) {
        this.loading = false
      }
    }
  }

  loadingStart() {
    this.incrementLoading()
  }

  loadingEnd() {
    this.decrementLoading()
  }
}

export default System