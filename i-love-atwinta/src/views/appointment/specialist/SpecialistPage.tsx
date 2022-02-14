import React, { ReactElement, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

// Components
import SpecialistCard from '~/components/cards/specialist/SpecialistCard'
import AdditionalHospitals from '~/components/common/AdditionalHospitals/AdditionalHospitals'
import CurrentChosenHospital from '~/components/common/CurrentChosenHospital/CurrentChosenHospital'
import Heading from '~/components/typography/Heading'
import Button from '~/components/_uikit/Button'
import NoFountEntity from '~/components/common/NoFoundEntity/NoFountEntity'
// Styles
import s from '~/views/appointment/specialist/SpecialistPage.module.scss'
// Hooks
import { useStore } from '~/hooks/useStore'
import useIsMobileView from '~/hooks/useIsMobile'
// Types
import RootStore from '~/store/modules/RootStore'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props {}

const SpecialistPage: React.FC<Props> = observer(({}) => {
  const store: RootStore = useStore()
  const specialistContainerRef = useRef(null)
  const firstRenderRef = useRef(true)
  const { isMobileView } = useIsMobileView()
  const hospitals = store.hospitalStore.additionalHospitals
  const specialists = store.specialistStore.specialists
  const displayedSpecialists = store.specialistStore.displayedSpecialists
  const canGoToNextPage = store.specialistStore.pagination.canGoNextPage
  const navigate = useNavigate()

  // ========================================Effects-START=======================================
  useEffect(() => {
    if (
      store.regionStore.currentRegion && store.regionStore.currentRegion.id &&
      store.specialityStore.currentSpeciality && store.specialityStore.currentSpeciality.idSpecialty &&
      store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData
    ) {
      store.specialistStore.fetchSpecialists({
        id_region: store.regionStore.currentRegion.id,
        id_user_data: store.patientStore.currentPatient.idUserData,
        id_specialty: store.specialityStore.currentSpeciality.idSpecialty
      })
    } else {
      navigate('/appointment/hospital', { replace: true })
    }
  }, [
    store.specialityStore,
    store.regionStore,
    store.patientStore,
    store.specialistStore,
    navigate
  ])

  useEffect(() => {
    if (isMobileView) {
      store.specialistStore.setWithPagination(true)
    } else {
      store.specialistStore.setWithPagination(false)
    }
  }, [isMobileView, store.specialistStore])

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    if (specialistContainerRef.current) {
      (specialistContainerRef.current as HTMLElement).scrollIntoView({behavior: 'smooth'})
    }
  }, [store.hospitalStore.pagination.currentPage, specialistContainerRef])
  // ========================================Effects-END=======================================

  const handleChooseSpecialist = useCallback((id: number) => {
    const foundSpecialist = store.specialistStore.specialists.find(spec => {
      return spec.idDoctor == id
    })

    if (foundSpecialist) {
      store.specialistStore.setSpecialist(foundSpecialist)
      store.appointmentStepsStore.setCurrentStepForDisabling(2)
      navigate({
        pathname: '/appointment/time',
      })
    }

  }, [
    navigate,
    store.specialistStore,
    store.appointmentStepsStore
  ])

  const cards: ReactElement<typeof SpecialistCard>[] = displayedSpecialists.map((specialist) => {
    return <SpecialistCard
      key={specialist.idDoctor}
      disabled={false}
      specialist={specialist}
      speciality={store.specialityStore.currentSpeciality ? store.specialityStore.currentSpeciality.name : ''}
      onClick={() => handleChooseSpecialist(specialist.idDoctor)}
    />
  })

  const changeHospital = (id: number) => {
    store.hospitalStore.setCurrentHospital(id)
    navigate('/appointment/specialist/speciality', { replace: true })
  }

  const handleShowMore = () => {
    store.specialistStore.pagination.goNextPage()
  }

  const resetPages = () => {
    store.specialistStore.pagination.setCurrentPage(1)
  }

  return (
    <>
      <div className={s.layoutCurrentHospital}>
        <CurrentChosenHospital/>
      </div>
      <div className={s.layoutHeading}>
        <Heading type='h2'>Доступные врачи для записи: </Heading>
      </div>
      <div className={s.layoutCards}>
        { 
        cards.length
        ? cards
        : (
          <div className={s.hospitalNoFoundData}>
            <NoFountEntity
              title='Нет подходящих врачей'
              titleMaxWidth={650}
              subtitle='Не нашли врачей? Расскажите нам об этом!'
              buttonText='Не нашли врачей'
              onClick={goToExternalService}
            />
          </div>
        )}
        {
          isMobileView && specialists.length > 3 && (
            <div className={s.buttonShowMore}>
              <Button
                onClick={canGoToNextPage ? handleShowMore : resetPages}
                buttonType='outlined'
                mobileView={isMobileView}
                sx={{
                  whiteSpace: 'nowrap',
                  minWidth: 'max-content'
                }}
              >
                { canGoToNextPage ? 'Показать еще' : 'Скрыть' }
              </Button>
            </div>

          )
        }
      </div>
      <AdditionalHospitals
        hospitals={hospitals}
        onClick={changeHospital}
      />
    </>
  )
})

export default SpecialistPage
