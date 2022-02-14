import React from 'react'
import { observer } from 'mobx-react-lite'

import { Typography } from '@mui/material'
// Components
import HospitalAtomType from '~/components/atom/hospital/type/HospitalAtomType'
import HospitalAtomAddress from '~/components/atom/hospital/address/HospitalAtomAddress'
import SpecialistAtomName from '~/components/atom/specialist/name/SpecialistAtomName'
import SpecialistAtomSpeciality from '~/components/atom/specialist/speciality/SpecialistAtomSpeciality'
// Styles
import s from '~/components/common/CurrentChosenHospital/CurrentChosenHospital.module.scss'
// Hooks
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'

interface Props {
  withSpecialistInfo?: boolean
}

const CurrentChosenHospital: React.FC<Props> = observer(({
  withSpecialistInfo = false,
}) => {
  const store: RootStore = useStore()
  const currentSpecialist = store.specialistStore.currentSpecialist
  const currentSpecialistSpeciality = store.specialistStore.currentSpecialistSpeciality
  const currentHospital = store.hospitalStore.currentHospital

  // Note: Стоит обработать этот кейс
  if (!currentHospital) {
    return null
  }
  
  return (
    <div className={s.currentHospitalWrapper}>
      <div className={s.currentHospitalTitle}>
        <Typography variant='h3' sx={{ color: '#2D3748'}}>{currentHospital.organisationName}</Typography>
      </div>
      <div className={s.currentDataContainer}>
        <div className={`${s.currentHospitalContainerData} ${s.currentHospitalContainerDataIconsFix}`}>
          <div className={s.currentHospitalTextIcon}>
            {/* ToDo: смотреть приватное или нет без hard-code значений */}
            <HospitalAtomType
              isPrivate={false}
              underline={false}
            />
          </div>
          <div className={s.currentHospitalTextIcon}>
            <HospitalAtomAddress
              iconClass={s.currentHospitalTextIconItself}
              address={currentHospital.address}
            />
          </div>
        </div>
        {
          withSpecialistInfo && currentSpecialist && (
            <div className={s.currentHospitalContainerData}>
              <div className={s.currentHospitalTextIcon}>
                <SpecialistAtomName name={currentSpecialist.lname}/>
              </div>
              <div className={s.currentHospitalTextIcon}>
                <SpecialistAtomSpeciality speciality={currentSpecialistSpeciality}/>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
})

export default CurrentChosenHospital
