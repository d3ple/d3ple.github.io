import React from 'react'

// Styles
import s from '~/components/cards/BaseEntityCard.module.scss'
import cardsStyles from '~/components/cards/CardsEntity.module.scss'
// Types
import { AppointmentEntityType } from '~/utils/services/constants'

interface Props {
  id?: number,
  imageComponent: React.ReactNode,
  descriptionComponent: React.ReactNode,
  additionalComponent?: React.ReactNode, // Костыль на самом деле, но пока нет идей, как не ломать логику выстраивания карточек без доп."слота"
  cardType: AppointmentEntityType,
  onClick: (id: number) => void,
}

const BaseEntityCard: React.FC<Props> = ({
  additionalComponent,
  imageComponent,
  descriptionComponent,
  cardType,
  onClick,
  id,
}) => {
  let entityClass = ''

  if (cardType === AppointmentEntityType.HOSPITAL) {
    entityClass = cardsStyles.cardHospital
  } else if (cardType === AppointmentEntityType.SPECIALIST) {
    entityClass = cardsStyles.cardSpecialists
  }

  return (
    <div className={`${s.card} ${entityClass}`} onClick={() => id && onClick(id)}>
      <div className={`${s.cardImage} ${cardsStyles.image}`}>
        { imageComponent }
      </div>
      <div className={`${s.cardDescription}  ${cardsStyles.description}`}>
        { descriptionComponent }
      </div>
      {
        additionalComponent ? 
        <div className={cardsStyles.additionalData}>
          { additionalComponent }
        </div> : null
      }
    </div>
  )
}

export default BaseEntityCard
