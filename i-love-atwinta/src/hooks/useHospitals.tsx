import { useStore } from "~/hooks/useStore"

import RootStore from "~/store/modules/RootStore"
import { IHospital } from "~/store/types/hospital"

export const useHospitals = () => {
  const store: RootStore = useStore()

  const hospitalsData: IHospital[] = store.hospitalStore.hospitalList

  return hospitalsData
}