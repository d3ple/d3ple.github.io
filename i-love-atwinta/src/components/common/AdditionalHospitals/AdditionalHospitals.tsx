import React, { ReactElement } from 'react'
import { IHospital } from '~/store/types/hospital'

// Styles
import s from '~/components/common/AdditionalHospitals/AdditionalHospitals.module.scss'
// Components
import Heading from '~/components/typography/Heading'
import HospitalCard from '~/components/cards/hospitals/HospitalCard'
import Button from '~/components/_uikit/Button'
import useIsMobileView from '~/hooks/useIsMobile'
import { useNavigate } from 'react-router-dom'

interface Props {
  hospitals: IHospital[],
  onClick: (id: number) => void,
}

const AdditionalHospitals: React.FC<Props> = ({
  onClick,
  ...props
}) => {
  const hospitals = [...props.hospitals] 
  const maxToShow = 4
  const navigate = useNavigate()
  const { isMobileView } = useIsMobileView()

  const showMore = () => {
    navigate('/appointment/hospital', { replace: true })
  }

  const hospitalCards: ReactElement<typeof HospitalCard>[] = hospitals.splice(0, maxToShow).map(hospital => {
    return <HospitalCard  
      key={hospital.idHospital}
      hospitalData={hospital}
      onClick={() => onClick(hospital.idHospital)}
    />
  })

  return (
    <>
      {
        true ? //hospitalCards.length
          <>
            <div className={s.textTitle}>
              <Heading type='h2'>Другие больницы доступные для онлайн записи:</Heading>
            </div>
            <div className={s.containerCards}>
              { hospitalCards }
            </div>
            <div className={s.showMore}>
              <Button
                mobileView={isMobileView}
                onClick={showMore}
                sx={{
                  whiteSpace: 'nowrap',
                  minWidth: 'max-content'
                }}
              >
                Показать еще
              </Button>
            </div>
          </>
          : null
      }
    </>
  )
}

export default AdditionalHospitals
