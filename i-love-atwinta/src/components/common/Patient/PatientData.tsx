import React from 'react'
import { observer } from 'mobx-react-lite'

// Styles
import s from '~/components/common/Patient/Patient.module.scss'
import Avatar from '~/components/common/Avatar/Avatar'
import { Box, Typography } from '@mui/material'

import OmsIcon from '~/assets/icons/oms-icon.svg'
import GenderIcon from '~/assets/icons/gender-icon.svg'
import AgeIcon from '~/assets/icons/age-icon.svg'
import { useStore } from '~/hooks/useStore'
import RootStore from '~/store/modules/RootStore'
import { Sex } from '~/store/types/patient'
import { declension } from '~/utils/helpers'

interface Props {}

const PatientDataCredentials: React.FC<Props> = observer(() => {
  const store: RootStore = useStore()
  const patient = store.patientStore.currentPatient
  const patientAge = store.patientStore.currentPatientAge
  const patientFullName = patient ? `${patient.fname} ${patient.lname} ${patient.mname}` : ''
  const decelAge = patientAge ? declension(patientAge, ['год', 'года', 'лет']) : ''

  return (
    <>
      {  
        patient && patientAge && <div className={s.patientCredentialsContainer}>
          <Box mb={5}>
            <Typography variant='h3'>{ patientFullName }</Typography>
          </Box>
          <ul className={s.patientCredentials}>
            <li>
              <img src={OmsIcon} alt="oms" />
              <Typography variant='bodyWeak2'>Полис ОМС: { patient.insurance_policy } </Typography>
            </li>
            <li>
              <img src={GenderIcon} alt="gender" />
              <Typography variant='bodyWeak2'>Возраст: { patientAge } { decelAge }</Typography>
            </li>
            <li>
              <img src={AgeIcon} alt="age" />
              <Typography variant='bodyWeak2'>Пол: { patient.id_gender === Sex.male ? 'мужской' : 'женский' }</Typography>
            </li>
          </ul>
        </div>
      }
    </>
  )
})

const PatientData: React.FC<Props> = observer(({}) => {
  const store: RootStore = useStore()
  const patientGender = store.patientStore.currentPatient ? store.patientStore.currentPatient.id_gender === Sex.male ? 'male' : 'female' : 'male'

  return (
    <div className={s.patientData}>
      <div className={s.patientDataAvatar}>
        <Avatar gender={patientGender}/>
      </div>
      <PatientDataCredentials />
    </div>
  )
})

export default PatientData