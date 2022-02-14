import React from 'react'

// Components
import BaseEntityCard from '~/components/cards/BaseEntityCard'
import SpecialistIcons from '~/components/icons/SpecialistIcons/SpecialistIcons'
// Type
import { AppointmentEntityType } from '~/utils/services/constants'
// Styles
import s from '~/components/cards/specialist/SpecialistCard.module.scss'
// Components
import Typography from '@mui/material/Typography'
import { ISpecialistEntity } from '~/store/types/specialist'

interface Props {
  specialist: ISpecialistEntity,
  speciality: string,
  disabled?: boolean,
  onClick: (id: number) => void
}

const SpecialistIcon: React.FC<Props> = ({ disabled }) => {
  return (
    <div className={s.specialistCardIconContainer}>
      <SpecialistIcons disabled={disabled}/>
    </div>
  )
}

const SpecialistDescription: React.FC<Props> = ({
  specialist,
  speciality,
}) => {
  return (
    <div className={s.specialistCardDescriptionContainer}>
      <Typography variant='h3'>{ specialist.lname }</Typography>
      <Typography variant='body4'>{ speciality }</Typography>
    </div>
  )
}

const SpecialistCard: React.FC<Props> = ({...props}) => {
  return (
    <BaseEntityCard
      id={props.specialist.idDoctor}
      imageComponent={<SpecialistIcon {...props} />}
      descriptionComponent={<SpecialistDescription {...props} />}
      cardType={AppointmentEntityType.SPECIALIST}    
      onClick={props.onClick}
    />
  )
}

export default SpecialistCard
