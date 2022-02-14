import React, { ChangeEvent, ReactElement, useCallback, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

// Components
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import HospitalCard from '~/components/cards/hospitals/HospitalCard'
import Heading from '~/components/typography/Heading'
import CheckboxTab from '~/components/_uikit/CheckboxTab'
import Pagination from '~/components/_uikit/Pagination'
import Button from '~/components/_uikit/Button'
import NoFountEntity from '~/components/common/NoFoundEntity/NoFountEntity'
import Search from '~/components/_uikit/Search/Search'
// Styles
import s from '~/views/appointment/hospitals/HospitalPage.module.scss'
// Hooks
import { useStore } from '~/hooks/useStore'
import useIsMobileView from '~/hooks/useIsMobile'
// Store
import RootStore from '~/store/modules/RootStore'
import Arrow from '~/components/icons/Arrow'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props { }

const HospitalPage: React.FC<Props> = observer(({ }) => {
  const store: RootStore = useStore()
  const hospitalContainerRef = useRef(null)
  const firstRenderRef = useRef(true)
  const { isMobileView } = useIsMobileView()
  const searchValue = store.hospitalStore.currentSearchValue
  const setSearchValue = (value: string) => store.hospitalStore.setCurrentSearchValue(value)

  const currentlyDisplayedData = store.hospitalStore.currentlyDisplayedHospitals

  const navigate = useNavigate()

  const handleChooseHospital = useCallback((id: number) => {
    store.hospitalStore.setCurrentHospital(id)
    store.appointmentStepsStore.setCurrentStepForDisabling(1)

    navigate(`/appointment/specialist/speciality`, { replace: true })
  }, [navigate, store.hospitalStore, store.appointmentStepsStore])

  const changePage = useCallback((page: number) => {
    store.hospitalStore.pagination.setCurrentPage(page)
  }, [store.hospitalStore])

  const handleSearch = (searchQuery: string) => {
    store.hospitalStore.setQuery(searchQuery)
    store.hospitalStore.pagination.setCurrentPage(1)
  }

  // ========================================Effects-START=======================================
  useEffect(() => {
    return () => {
      store.hospitalStore.setCurrentSearchValue('')
      store.hospitalStore.setQuery('')
    }
  }, [store.hospitalStore])

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    if (hospitalContainerRef.current) {
      (hospitalContainerRef.current as HTMLElement).scrollIntoView({behavior: 'smooth'})
    }
  }, [store.hospitalStore.pagination.currentPage, hospitalContainerRef])

  useEffect(() => {
    if (isMobileView) {
      store.hospitalStore.pagination.setItemsDisplayedOnPage(4)
    } else {
      store.hospitalStore.pagination.setItemsDisplayedOnPage(7)
    }
  }, [isMobileView, store.hospitalStore])

  useEffect(() => {
    if (
      store.hospitalStore.hospitalList.length === 0 &&
      store.regionStore.currentRegion && store.regionStore.currentRegion.id &&
      store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData
    ) {
      store.hospitalStore.fetchHospitals({
        id_region: store.regionStore.currentRegion.id,
        id_user_data: store.patientStore.currentPatient.idUserData
      })
    } 
    else if (
      !(store.regionStore.currentRegion && store.regionStore.currentRegion.id &&
        store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData)
    ) {
      navigate('/new-patient', { replace: true })
    }
  }, [
    store.hospitalStore,
    store.patientStore,
    store.regionStore,
    store.regionStore.currentRegion,
    navigate
  ])
  // ========================================Effects-END=======================================

  const cards: ReactElement<typeof HospitalCard>[] = currentlyDisplayedData.map(hospital => {
    return <HospitalCard
      key={hospital.idHospital}
      hospitalData={hospital}
      onClick={() => handleChooseHospital(hospital.idHospital)}
    />
  })

  // eslint-disable-next-line 
  const governmentControlCallback = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    store.hospitalStore.toggleGovernmentFilter()
  }

  // eslint-disable-next-line 
  const privateControlCallback = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    store.hospitalStore.togglePrivateFilter()
  }

  return (
    <>
      <div className={s.layoutHeading}>
        <Heading type='h2'>Доступные организации для записи:</Heading>
      </div>
      <div className={s.layoutContainer} ref={hospitalContainerRef}>
        <Wrapper noPadding>
          <div className={s.layoutSearchBar}>
            <Search
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
            />
          </div>
          <div className={s.layoutSearchFilters}>
            <CheckboxTab
              label='Государственные'
              name='government'
              onChange={governmentControlCallback}
              value={store.hospitalStore.hospitalsFilter.government}
            />
            <CheckboxTab
              label='Частные'
              name='private'
              onChange={privateControlCallback}
              value={store.hospitalStore.hospitalsFilter.private}
            />
          </div>
        </Wrapper>
      </div>
      <div className={s.layoutCards}>
        {
          cards.length
            ? cards
            : (
              <div className={s.hospitalNoFoundData}>
                <NoFountEntity
                  title='Нет подходящих больниц'
                  subtitle='Не нашли больницу? Расскажите нам об этом!'
                  buttonText='Не нашли больницу'
                  onClick={goToExternalService}
                />
              </div>
            )
        }
      </div>
      {
        !store.hospitalStore.pagination.noPagesOrSinglePage && <div className={s.layoutCardsPagination}>
          {
            isMobileView ?
              <>
                <Button
                  mobileView={true}
                  buttonType="outlined"
                  disabled={!store.hospitalStore.pagination.canGoPreviousPage}
                  onClick={() => store.hospitalStore.pagination.goPreviousPage()}
                  iconLeft={<Arrow direction='left' color={!store.hospitalStore.pagination.canGoPreviousPage ? '#CBD5E0' : '#5B6473'}/>}
                >Назад</Button>
                <Button
                  mobileView={true}
                  buttonType="outlined"
                  disabled={!store.hospitalStore.pagination.canGoNextPage}
                  onClick={() => store.hospitalStore.pagination.goNextPage()}
                  iconRight={<Arrow direction='right' color={!store.hospitalStore.pagination.canGoNextPage ? '#CBD5E0' : '#5B6473'}/>}
                >Вперед</Button>
              </>
              :
              <Pagination
                count={store.hospitalStore.pagination.amountOfPages}
                currentPage={store.hospitalStore.pagination.currentPage}
                onChange={changePage}
              />
          }
        </div>
      }
    </>
  )
})

export default HospitalPage
