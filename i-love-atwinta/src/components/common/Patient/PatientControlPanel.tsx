import React from 'react'
import { SxProps } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import Button from '~/components/_uikit/Button'
import { ButtonAccents } from '~/store/types/vendor'
import s from '~/components/common/Patient/Patient.module.scss'

interface Props {}

const PatientControlPanel: React.FC<Props> = () => {
  const navigate = useNavigate()

  const changePatient = () => {
    navigate('/new-patient', { replace: true })
  }

  const redirectToJournal = () => {
    navigate('/appointment/journal', { replace: true })
  }

  const style: SxProps = {
    padding: {
      xs: '15px 0px',
      sm: '15px 14px',
    },
    height: {
      xs: '40px',
      sm: '80px',
    },
    fontWeight: {
      xs: 400,
      sm: 500,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '1.25rem',
    },
    letterSpacing: '1px',
  }

  return (
    <div className={s.patientControls}>
      <Button sx={{
        borderRadius: '7px',
        ...style
      }} onClick={changePatient}>Сменить пациента</Button>
      <Button sx={{
        borderRadius: '7px',
        ...style
      }} onClick={redirectToJournal} accent={ButtonAccents.LIGHT}>Журнал посещений</Button>
    </div>
  )
}

export default PatientControlPanel
