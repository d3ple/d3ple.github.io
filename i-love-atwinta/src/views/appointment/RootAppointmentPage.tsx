import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Navigate, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

// Pages
import HospitalPage from '~/views/appointment/hospitals/HospitalPage'
import SpecialistPage from '~/views/appointment/specialist/SpecialistPage'
import SpecialityPage from '~/views/appointment/speciality/SpecialityPage'
import AppointmentTimePage from '~/views/appointment/time/AppointmentTimePage'
import JournalPage from '~/views/appointment/journal/JournalPage'
// Components
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import UserAppointmentSteps from '~/components/views/appointment/UserAppointmentSteps/UserAppointmentSteps'
import UserInformation from '~/components/views/appointment/UserInformation'
// Styles
import s from '~/views/appointment/RootAppointmentPage.module.scss'
// Hooks
import { useStore } from '~/hooks/useStore'
import usePrevious from '~/hooks/usePrevious'

interface Props { }
const RootAppointmentPage: React.FC<Props> = observer(({ }) => {
  const { pathname } = useLocation()
  const store = useStore()
  const hospitalId = store.hospitalStore.currentHospital ? store.hospitalStore.currentHospital.idHospital : null
  const previousStoreData = usePrevious({
    hospitalId, 
  })

  useEffect(() => {
    return () => {
      store.resetAppointmentProcess()
    }
  }, [store])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname])

  return <>
    <Wrapper>
      <UserInformation />
    </Wrapper>
    {
      pathname === '/appointment/journal'
        ?
        null
        :
        <div className={s.userSteps}>
          <Wrapper>
            <UserAppointmentSteps />
          </Wrapper>
        </div>
    }
    <Wrapper>
      <Routes>
        <Route path="hospital" element={<HospitalPage />} />

        <Route path="specialist/speciality" element={<SpecialityPage  previousHospitalId={previousStoreData?.hospitalId} hospitalId={hospitalId}/>} />
        
        <Route path="specialist/person" element={<SpecialistPage />} />

        <Route path="specialist" element={<Navigate to="/appointment/specialist/speciality" />} />

        <Route path="time" element={<AppointmentTimePage />} />

        <Route path="journal" element={<JournalPage />} />

      </Routes>
    </Wrapper>
  </>
})

export default RootAppointmentPage