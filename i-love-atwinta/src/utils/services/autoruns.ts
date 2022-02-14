// import { autorun } from "mobx"
import RootStore from "~/store/modules/RootStore"

// eslint-disable-next-line
const createGlobalAutoRuns = (store: RootStore) => {
  // autorun(() => {
  //   store.appointmentStepsStore.setSteps(
  //     store.appointmentStepsStore.steps.map((item, idx) => {
  //       if (idx <= store.appointmentStepsStore.currentStepForDisabling) {
  //         item.disabled = false
  //       } else item.disabled = true
    
  //       return item
  //     })
  //   )
  // })
}

export default createGlobalAutoRuns