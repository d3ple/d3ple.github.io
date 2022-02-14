import { Typography } from '@mui/material'
import React from 'react'

import BlueArrow from '~/assets/icons/arrow-card.svg'

// Styles
import s from '~/components/cards/speciality/SpecialityCard.module.scss'

interface Props {
  title: string,
  onClick: (id: number) => void
}

const SpecialityCard: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div className={s.specialityCard} onClick={() => onClick(12)}>
      <div className={s.specialityCardContainer}>
        <div className={s.specialityCardText}>
          <Typography variant='bodyWeak2'>{ title }</Typography>
        </div>
        <img src={BlueArrow}/>
      </div>
    </div>
  )
}

export default SpecialityCard
