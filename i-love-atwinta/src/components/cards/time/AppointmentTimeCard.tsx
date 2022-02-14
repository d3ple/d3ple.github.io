import React from 'react'

// Styles
import s from '~/components/cards/time/AppointmentTimeCard.module.scss'
// Types
import { IAppointmentTicketTimeSlot } from '~/store/types/appointment'

type ICardAppointmentCard = IAppointmentTicketTimeSlot & {
  onClick: (idExternal: string) => void
}

const AppointmentTimeCard: React.FC<ICardAppointmentCard> = ({
  isClosed,
  value,
  idTicket,
  onClick
}) => {
  const isAvailableForAppointment = isClosed === 0
  const appointmentStatus = isAvailableForAppointment ? 'Свободно' : 'Занято'

  return (
    <div
      onClick={() => isAvailableForAppointment && onClick(idTicket)}
      className={`${s.card} ${isAvailableForAppointment ? s.cardAvailable : s.cardDisabled }`}
    >
      <div className={s.cardContainerTime}>
        <p className={`${s.cardTime} ${isAvailableForAppointment ? s.cardAvailableTime : s.cardDisabledTime }`}>{ value[0] === '0' ? value.slice(1, -3) : value.slice(0, -3) }</p>
        {/* Card Status */}
        <p className={`${ s.cardStatus } ${isAvailableForAppointment ? s.cardAvailableStatus : s.cardDisabledStatus }`}>{ appointmentStatus }</p>
      </div>
      {/* TODO: тут временный костыль, пока нет данных и неясно что отображать */}
      <p className={`${ s.cardDescription } ${isAvailableForAppointment ? s.cardAvailableDescription : s.cardDisabledDescription }`}>
        { '' }
      </p>
      <div className={s.cardAdditionalInformation}>
      </div>
    </div>
  )
}

export default AppointmentTimeCard
