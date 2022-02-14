import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { IBreadcrumb } from '~/store/types/system'
import { useStore } from '~/hooks/useStore'
import RootStore from '~/store/modules/RootStore'
import { useAppointmentSteps, AppointmentStepsRoutes } from '~/hooks/useAppointmentSteps'

const useBreadcrumbs = () => {
  const { pathname } = useLocation()
  const [location, setLocation] = useState<IBreadcrumb | null>(null)
  const store: RootStore = useStore()
  const { currentStepIdx } = useAppointmentSteps()

  // ========================================Effects-START=======================================
  useEffect(
    () => {
      switch(pathname) {
        case '/new-patient':
        setLocation({
          to: 'https://onlinezdrav.ru/moskva/spisok-mo/', // todo: заменить
          title: 'Вернуться к выбору медицинских учреждений',
          external: true,
        })
        break;
        case '/appointment/hospital':
        setLocation({
          to: '/new-patient',
          title: 'Вернуться на страницу авторизации',
        })
        break;
        case '/appointment/specialist/speciality':
        setLocation({
          to: '/appointment/hospital',
          title: 'Вернуться на страницу выбор больниц',
        })
        break;
        case '/appointment/specialist/person':
        setLocation({
          to: '/appointment/specialist/speciality',
          title: 'Вернуться на страницу выбор специальности',
        })
        break;
        case '/appointment/time':
        setLocation({
          to: '/appointment/specialist/person',
          title: 'Вернуться на страницу выбора врачей',
        })
        break;
        case '/appointment/journal': {
          if (currentStepIdx === 0) {
            setLocation({
              to: '/appointment/hospital',
              title: 'Вернуться к выбору медицинских учреждений',
            })
          } else if (
            currentStepIdx === 1
          ) {
            if (store.appointmentStepsStore.currentStepRoute === AppointmentStepsRoutes.SPECIALITY) {
              setLocation({
                to: '/appointment/specialist/speciality',
                title: 'Вернуться на страницу выбор специальности',
              })
            } else if (store.appointmentStepsStore.currentStepRoute === AppointmentStepsRoutes.SPECIALIST) {
              setLocation({
                to: '/appointment/specialist/person',
                title: 'Вернуться на страницу выбора врачей',
              })
            }
          } else if (currentStepIdx === 2) {
            setLocation({
              to: '/appointment/time',
              title: 'Вернуться на страницу выбора времени записи',
            })
          }
        }
        break;
        default: 
        setLocation(null)
      }
    }, [pathname, currentStepIdx, store.appointmentStepsStore])
  // ========================================Effects-END=======================================

  return location
}

export default useBreadcrumbs