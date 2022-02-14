import { makeAutoObservable } from 'mobx'

/**
 * Note: Класс помощник для упрощения работы с "тоглерами"
 */
class Toggle {
  constructor() {
    makeAutoObservable(this)
  }

  // ---------------------------- Toggle ---------------------------- >>
  value = false

  onChange(value: boolean) {
    this.value = value
  }
}

const ToggleModule = new Toggle()
export default ToggleModule