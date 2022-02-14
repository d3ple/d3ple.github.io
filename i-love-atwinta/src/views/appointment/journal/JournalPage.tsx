import React, { useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

// Components
import Heading from '~/components/typography/Heading'
import PassedAppointments from '~/components/views/appointment/journal/PassedAppointments/PassedAppointments'
import UpcomingAppointments from '~/components/views/appointment/journal/UpcomingAppointments/UpcomingAppointments'
import Button from '~/components/_uikit/Button'
import Pagination from '~/components/_uikit/Pagination'
// Styles
import s from '~/views/appointment/journal/JournalPage.module.scss'
// Types
import RootStore from '~/store/modules/RootStore'
// Hooks
import { useStore } from '~/hooks/useStore'
import { useJournalAppointements } from '~/hooks/useJournalAppointements'
import useIsMobileView from '~/hooks/useIsMobile'
import Arrow from '~/components/icons/Arrow'
import { useNavigate } from 'react-router-dom'

interface Props {}

const JournalPage: React.FC<Props> = observer(() => {
  const store: RootStore = useStore()
  const navigate = useNavigate()
  const { isMobileView } = useIsMobileView()
  const { passedAppointments, upcomingAppointments } = useJournalAppointements()
  
  // ========================================Effects-START=======================================
  useEffect(() => {
    if (
      store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData
    ) {
      store.journalStore.fetchJournal({
        id_user_data: store.patientStore.currentPatient.idUserData
      })
    } else {
      navigate('/new-patient', { replace: true })
    }
  }, [navigate, store.journalStore, store.patientStore])

  const changePage = useCallback((page: number) => {
    store.journalStore.pagination.setCurrentPage(page)
  }, [store.journalStore.pagination])

  useEffect(() => {
    if (isMobileView) {
      store.journalStore.pagination.setItemsDisplayedOnPage(4)
    } else {
      store.journalStore.pagination.setItemsDisplayedOnPage(5)
    }
  }, [
    isMobileView,
    store.journalStore.pagination
  ])
  // ========================================Effects-END=======================================

  return (
    <>
      {
        upcomingAppointments.length > 0 ? 
        <>
          <div className={s.layoutTitle}>
            <Heading type='h2'>Ближайшие записи:</Heading>
          </div>
          <div className={s.layoutUpcomingAppointments}>
            <UpcomingAppointments />
          </div>
        </>
        : null
      }
      {
        passedAppointments.length > 0 ? 
        <>
          <div className={s.layoutTitle}>
            <Heading type='h2'>Прошедшие записи:</Heading>
          </div>
          <div className={s.layoutPassedAppointments}>
            <PassedAppointments />
          </div>
        </>
        : null
      }
      <div className={s.layout}>
        <div className={s.layoutPaginationContainer}>
          {
            !store.journalStore.pagination.noPagesOrSinglePage && (isMobileView ? 
              <>
                <Button
                  mobileView={true}
                  buttonType="outlined"
                  disabled={!store.journalStore.pagination.canGoPreviousPage}
                  onClick={() => store.journalStore.pagination.goPreviousPage()}
                  iconLeft={<Arrow direction='left' color={!store.journalStore.pagination.canGoPreviousPage ? '#CBD5E0' : '#5B6473'}/>}
                >Назад</Button>
                <Button
                  mobileView={true}
                  buttonType="outlined"
                  disabled={!store.journalStore.pagination.canGoNextPage}
                  onClick={() => store.journalStore.pagination.goNextPage()}
                  iconRight={<Arrow direction='right' color={!store.journalStore.pagination.canGoNextPage ? '#CBD5E0' : '#5B6473'}/>}
                >Вперед</Button>
              </>
            :
              <Pagination
                count={store.journalStore.pagination.amountOfPages}
                currentPage={store.journalStore.pagination.currentPage}
                onChange={changePage}
              />
            )
          }
        </div>

      </div>
    </>
  )
})

export default JournalPage
