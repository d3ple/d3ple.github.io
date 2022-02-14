import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import SpecialityCard from '~/components/cards/speciality/SpecialityCard'
import NoFountEntity from '~/components/common/NoFoundEntity/NoFountEntity'
import { useStore } from '~/hooks/useStore'
import RootStore from '~/store/modules/RootStore'
import { ISpecialityEntity } from '~/store/types/specialties'
// Styles
import s from '~/views/appointment/speciality/SpecialtyChooseSection/SpecialtyChooseSection.module.scss'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props {
  specialities: ISpecialityEntity[]
}

const SpecialtyChooseSection: React.FC<Props> = ({ specialities }) => {
  const store: RootStore = useStore()
  const navigate = useNavigate()

  const handleClickSpecialityCard = (id: number): void => {
    store.specialityStore.setCurrentSpeciality(id)
    store.appointmentStepsStore.setCurrentStepForDisabling(1)
    navigate({
      pathname: '/appointment/specialist/person',
    })
  }
  
  const cards: ReactElement<typeof SpecialityCard>[] = specialities.map((speciality) => {
    return <SpecialityCard
      key={speciality.idSpecialty}
      title={speciality.name}
      onClick={() => handleClickSpecialityCard(speciality.idSpecialty)}
    />
  })

  return (
    <>
      {
        cards.length ?
        <section className={s.specialityCardsGrid}>
          { cards }
        </section>
        :
        <div className={s.hospitalNoFoundData}>
          <NoFountEntity
            title='Нет подходящих специальностей'
            titleMaxWidth={670}
            subtitle='Не нашли специальность? Расскажите нам об этом!'
            buttonText='Не нашли специальность'
            onClick={goToExternalService}
          />
        </div>
      }
    </>
  )
}

export default SpecialtyChooseSection
