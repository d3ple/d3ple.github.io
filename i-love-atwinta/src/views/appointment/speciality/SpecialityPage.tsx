import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

// Hooks
import { useStore } from '~/hooks/useStore'
// Components
import CurrentChosenHospital from '~/components/common/CurrentChosenHospital/CurrentChosenHospital'
import Heading from '~/components/typography/Heading'
import AdditionalHospitals from '~/components/common/AdditionalHospitals/AdditionalHospitals'
// Styles
import s from '~/views/appointment/speciality/SpecialityPage.module.scss'
// SubPage (???)
import SpecialtyChooseSection from '~/views/appointment/speciality/SpecialtyChooseSection/SpecialtyChooseSection'
// Types
import { ISpecialityEntity } from '~/store/types/specialties'

interface Props {
  hospitalId?: number | null,
  previousHospitalId: number | null | undefined,
}

const SpecialityPage: React.FC<Props> = observer(({
  hospitalId,
  previousHospitalId,
}) => {
  const store = useStore()
  const specialities: ISpecialityEntity[] = store.specialityStore.specialities
  const hospitals = store.hospitalStore.additionalHospitals
  const navigate = useNavigate()

  const changeHospital = (id: number) => {
    store.hospitalStore.setCurrentHospital(id)
    navigate('/appointment/specialist/speciality', { replace: true })
  }

  useEffect(() => {
    if (
      store.regionStore.currentRegion && store.regionStore.currentRegion.id &&
      store.patientStore.currentPatient && store.patientStore.currentPatient.idUserData &&
      hospitalId
    ) {
      if (previousHospitalId !== hospitalId) {
        store.specialityStore.fetchSpecialities({ 
          id_region: store.regionStore.currentRegion.id,
          id_user_data: store.patientStore.currentPatient.idUserData,
          id_hospital: hospitalId
        })
      }
    } else {
      navigate('/appointment/hospital', { replace: true })
    }
  }, [
    store.specialityStore,
    store.hospitalStore.currentHospital,
    store.patientStore.currentPatient, 
    store.regionStore.currentRegion,
    previousHospitalId,
    hospitalId,
    navigate
  ])

  return (
    <>
      <div className={s.layoutCurrentHospital}>
        <CurrentChosenHospital />
      </div>
      <div className={s.layoutHeading}>
        <Heading type='h2'>Специальности доступные для записи: </Heading>
      </div>
      <div className={s.layoutChooseSection}>
        <SpecialtyChooseSection
          specialities={specialities}
        />
      </div>
      <AdditionalHospitals
        hospitals={hospitals}
        onClick={changeHospital}
      />
    </>
  )
})

export default SpecialityPage
