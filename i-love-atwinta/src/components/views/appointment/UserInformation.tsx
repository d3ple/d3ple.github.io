import React from 'react'

// Components
import Heading from '~/components/typography/Heading'
import PatientData from '~/components/common/Patient/PatientData'
import PatientControlPanel from '~/components/common/Patient/PatientControlPanel'
// Styles
import s from '~/components/views/appointment/UserInformation.module.scss'

interface Props {}

const UserInformation: React.FC<Props> = ({}) => {

  return (
    <div className={s.layoutUserInformation}>
      <div className={s.userDataContainer}>
        <div className={s.userDataHeading}>
          <Heading type='h2' typographyType='accent' color='blueish'>
            Онлайн запись на прием к врачу
          </Heading>
        </div>
        <div className={s.userDataItself}>
          <PatientData />
        </div>
        <div className={s.userDataControls}>
          <PatientControlPanel />
        </div>
      </div>
    </div>
  )
}

export default UserInformation
