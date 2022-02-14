import React from 'react'

// Store
import { Typography } from '@mui/material'
// Styles
import s from '~/components/atom/specialist/speciality/SpecialistAtomSpeciality.module.scss'

interface Props {
  speciality: string,
  iconClass?: string,
}

const SpecialistAtomSpeciality: React.FC<Props> = ({
  speciality,
  iconClass
}) => {
  return (
    <>
      <svg className={iconClass ? iconClass : s.defaultIconClass} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 22C5.69594 18.851 6.3846 16.6927 9 15.25C10.0551 16.6466 10.5 17.5 12.5 18.625C14 17.5 15 16.375 16 15.25C17.9138 16.8904 19.4668 19.1211 20 22C11 22 10.5 22 5 22Z" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.4047 8.81055C15.7795 9.23828 16 9.75391 16 10.3105C16 11.793 14.4346 13 12.5 13C10.5654 13 9 11.7988 9 10.3105C9 9.61328 9.34724 8.98047 9.91496 8.5L15.4047 8.80469V8.81055Z" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1148 4H7.67578L8.63058 9.46275H16.4842L17.1148 4Z" fill="#FEFEFE" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path d="M12.4883 4.47852V7.79961" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path d="M10.9141 6.11816H14.0795" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
      </svg>

      <Typography variant='body4'>{ speciality }</Typography>
    </>
  )
}

export default SpecialistAtomSpeciality
