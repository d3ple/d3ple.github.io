import React from 'react'

// Components
import ProgressSteps from '~/components/ProgressSteps'
import AppointmentSteps from '~/components/views/appointment/UserAppointmentSteps/AppointmentSteps'
// Styling
import s from '~/components/views/appointment/UserAppointmentSteps/AppointmentSteps.module.scss'

interface Props {}

const UserAppointmentSteps: React.FC<Props> = ({}) => {

  return (
    <div className={s.steps}>
      <div className={s.stepsMain}>
        <AppointmentSteps /> 
      </div>
      <div className={s.stepsProgress}>
        <ProgressSteps /> 
      </div>
    </div>
  )
}

export default UserAppointmentSteps
