import { makeAutoObservable } from 'mobx'
import RootStore from '~/store/modules/RootStore';

interface IStep {
  active: boolean,
  disabled: boolean,
  title: string,
}

/**
 * Note: Общий класс предназначенный для работы c шагами записи на приём
 *  - шаги для осуществления записи
 */

class AppointmentSteps {
  rootStore!: RootStore

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this);
    if (rootStore) {
      this.rootStore = rootStore;
    }
  }

  // ---------------------------- Appointment Steps Process ---------------------------- >>
  currentStep = 0
  currentStepForDisabling = 0
  currentStepRoute = ''

  setCurrentStepRoute(route: string) {
    this.currentStepRoute = route
  }

  setCurrentStepForDisabling(stepIndex: number) {
    this.currentStepForDisabling = stepIndex
  }

  get steps(): IStep[] {
    const initialState = [
      { active: false, disabled: false, title: 'Выбор больницы' },
      { active: false, disabled: false, title: 'Выбор специальности и врача' },
      { active: false, disabled: false, title: 'Выбор времени приема' },
    ]

    return initialState.map((item, idx) => {
      if (idx <= this.currentStepForDisabling) {
        item.disabled = false
      } else item.disabled = true

      return item
    })
  }

  get currentProgressPercent(): number {
    return Math.ceil(
      this.steps.reduce((acc: number, _: IStep, idx: number) => {
        if (idx <= this.currentStep) {
          return acc += 1 / this.steps.length
        }
        return acc += 0
      }, 0) * 100
    ) 
  }

  get currentProgressStep() {
    return this.steps.reduce((acc: number, _: IStep, idx: number) => {
      if (idx <= this.currentStep) {
        return acc += 1
      }
      return acc += 0
    }, 0)
  }

  setCurrentStep(step: number) {
    this.currentStep = step
  }
}

export default AppointmentSteps