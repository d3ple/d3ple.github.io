import React from 'react'

// Icons
import Specialist from '~/assets/icons/specialists/specialist.svg'
import SpecialistDisabled from '~/assets/icons/specialists/specialist-disabled.svg'

interface Props {
  disabled?: boolean,
}

const SpecialistIcons: React.FC<Props> = ({ disabled }) => {
  const Icon = disabled ? SpecialistDisabled : Specialist

  return (
    <img
      src={Icon}
      alt="Специалист"
    /> 
  )
}

export default SpecialistIcons
