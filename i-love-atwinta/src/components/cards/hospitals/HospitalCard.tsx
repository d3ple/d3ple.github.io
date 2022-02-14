import { Typography } from '@mui/material'
import React from 'react'

// Components
import HospitalIcons from '~/components/icons/HospitalIcons/HospitalIcons'
import BaseEntityCard from '~/components/cards/BaseEntityCard'
import HospitalAtomAddress from '~/components/atom/hospital/address/HospitalAtomAddress'
import HospitalAtomType from '~/components/atom/hospital/type/HospitalAtomType'
// Styles
import s from '~/components/cards/hospitals/HospitalCard.module.scss'
// Utils
import { AppointmentEntityType } from '~/utils/services/constants'
import { IHospital } from '~/store/types/hospital'
import useIsTabletopView from '~/hooks/useIsTabletop'


type Props = {
  hospitalData: IHospital,
  onClick: (id: number) => void
}

const HospitalIcon: React.FC<Props> = ({ }) => {
  return (
    <div className={`${s.hospitalCardIconContainer} ${false ? s.hospitalCardIconContainerParent : ''}`}>
      <HospitalIcons disabled={false} isParent={false} />
      {false && <div className={s.hospitalCardPrivateSign}><svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#2AD966" /><path d="M13.2581 17.6914V9.69429C13.2581 9.50571 13.3183 9.34286 13.4387 9.20571C13.5591 9.06857 13.7022 9 13.8677 9H19.5581C20.2957 9 20.9882 9.11143 21.6355 9.33429C22.2979 9.54 22.8774 9.86571 23.3742 10.3114C23.871 10.7571 24.2624 11.3229 24.5484 12.0086C24.8495 12.6943 25 13.5086 25 14.4514C25 15.3943 24.8495 16.2171 24.5484 16.92C24.2624 17.6057 23.871 18.18 23.3742 18.6429C22.8774 19.1057 22.2979 19.4486 21.6355 19.6714C20.9882 19.8943 20.2957 20.0057 19.5581 20.0057H15.4032V21.2914H20.3032C20.6344 21.2914 20.8 21.48 20.8 21.8571V23.04C20.8 23.4171 20.6344 23.6057 20.3032 23.6057H15.4032V26.3057C15.4032 26.4943 15.343 26.6571 15.2226 26.7943C15.1022 26.9314 14.9591 27 14.7935 27H13.8677C13.7022 27 13.5591 26.9314 13.4387 26.7943C13.3183 26.6571 13.2581 26.4943 13.2581 26.3057V23.6057H11.4968C11.1656 23.6057 11 23.4171 11 23.04V21.8571C11 21.48 11.1656 21.2914 11.4968 21.2914H13.2581V20.0057H11.4968C11.1656 20.0057 11 19.8171 11 19.44V18.2571C11 17.88 11.1656 17.6914 11.4968 17.6914H13.2581ZM15.4032 17.6914H19.4452C20.529 17.6914 21.3645 17.4257 21.9516 16.8943C22.5538 16.3629 22.8548 15.5486 22.8548 14.4514C22.8548 13.3543 22.5538 12.5571 21.9516 12.06C21.3645 11.5629 20.529 11.3143 19.4452 11.3143H15.4032V17.6914Z" fill="white" /></svg></div>}
    </div>
  )
}

const HospitalDescriptionText: React.FC<{ isPrivate: boolean, address: string }> = ({ isPrivate, address }) => {
  return (
    <div className={s.hospitalCardDescriptionContainer}>
      <div className={s.hospitalCardDescriptionText}>
        <HospitalAtomAddress address={address} iconClass={s.hospitalCardIcon} />
      </div>
      <div className={s.hospitalCardDescriptionText}>
        <HospitalAtomType
          isPrivate={isPrivate}
          iconClass={s.hospitalCardIcon}
          underline={false}
        />
      </div>
    </div>
  )
}

const HospitalDescription: React.FC<Props> = ({ hospitalData: { address, organisationName } }) => {
  const { isTabletopBetweenMobile } = useIsTabletopView()

  return (
    <div className={s.hospitalCardDescription}>
      <div>
        {/* Странно почему нет подходящего размера... */}
        <Typography variant='smallh3'
          sx={{
            fontSize: isTabletopBetweenMobile ? '1rem' : 'auto'
          }}
        >{organisationName}</Typography>
      </div>
      {/* Notes: скрывается на мобилках */}
      <div className={s.hospitalCardDescriptionTextContainer}>
        <HospitalDescriptionText isPrivate={false} address={address} />
      </div>
    </div>
  )
}

const HospitalCard: React.FC<Props> = ({
  ...props
}) => {

  return (
    <BaseEntityCard
      id={props.hospitalData.idHospital}
      imageComponent={<HospitalIcon {...props} />}
      descriptionComponent={<HospitalDescription {...props} />}
      additionalComponent={
        <HospitalDescriptionText isPrivate={false} address={props.hospitalData.address} />
      }
      cardType={AppointmentEntityType.HOSPITAL}
      onClick={props.onClick}
    />
  )
}

export default HospitalCard
