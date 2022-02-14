import { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useStore } from "~/hooks/useStore"
import RootStore from "~/store/modules/RootStore"

export enum AppointmentStepsRoutes {
  HOSPITALS = '/appointment/hospital',
  SPECIALITY = '/appointment/specialist/speciality',
  SPECIALIST = '/appointment/specialist/person',
  TIME = '/appointment/time'
}

// Note: Может быть массив, но оставляю объект на случай расшерения
export const NavigationIndexes: Record<number, string> = {
  0: AppointmentStepsRoutes.HOSPITALS,
  1: AppointmentStepsRoutes.SPECIALITY,
  2: AppointmentStepsRoutes.TIME,
}

export const useAppointmentSteps = () => {
  const store: RootStore = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const steps = store.appointmentStepsStore.steps
  const currentStepIdx = store.appointmentStepsStore.currentStep
  const currentStep = store.appointmentStepsStore.steps.find((_, idx) => idx === currentStepIdx)
  const currentProgressPercent = store.appointmentStepsStore.currentProgressPercent
  const currentProgressStep = store.appointmentStepsStore.currentProgressStep

  const setCurrentStep = useCallback((stepIndex: number) => {
    store.appointmentStepsStore.setCurrentStep(stepIndex)
  }, [store.appointmentStepsStore])

  // TODO: Пересчёт ещё нужно продумать для Москвы
  const recalculateStepsStatusBasedOnRoutes = (redirectTo: string) => {
    switch(redirectTo) {
      case '/appointment/hospital':
      store.appointmentStepsStore.setCurrentStepForDisabling(0)
      break;  
      case '/appointment/specialist/person':
      case '/appointment/specialist/speciality':
      store.appointmentStepsStore.setCurrentStepForDisabling(1)
      break;
      case '/appointment/time':
      store.appointmentStepsStore.setCurrentStepForDisabling(2)
      break;
      default:
      break;
    }
  }

  // Note: Используется в основных табах
  const goToStep = (event: React.SyntheticEvent, newValue: number) => {
    navigate(NavigationIndexes[newValue], { replace: true })
  }

  useEffect(() => {
    if (pathname === AppointmentStepsRoutes.HOSPITALS) {
      setCurrentStep(0)
    } else if (pathname === AppointmentStepsRoutes.SPECIALIST || pathname === AppointmentStepsRoutes.SPECIALITY) {
      store.appointmentStepsStore.setCurrentStepRoute(pathname)
      setCurrentStep(1)
    } else if (pathname === AppointmentStepsRoutes.TIME) {
      setCurrentStep(2)
    }
  }, [pathname, navigate, setCurrentStep, store.appointmentStepsStore])

  return {
    setCurrentStep,
    goToStep,
    currentStep,
    currentStepIdx,
    currentProgressPercent,
    currentProgressStep,
    recalculateStepsStatusBasedOnRoutes,
    steps
  }
}