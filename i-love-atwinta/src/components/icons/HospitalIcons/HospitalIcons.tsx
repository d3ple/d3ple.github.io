import React, { memo } from 'react'

// Icons
import ParentHospital from '~/assets/icons/hospitals/parent-hospital.svg'
import ChildHospital from '~/assets/icons/hospitals/child-hospital.svg'
import ParentHospitalDisabled from '~/assets/icons/hospitals/parent-hospital-disabled.svg'
import ChildHospitalDisabled from '~/assets/icons/hospitals/child-hospital-disabled.svg'

interface Props {
  disabled?: boolean,
  isParent?: boolean,
}

const HospitalIcons: React.FC<Props> = memo(({
  disabled = false,
  isParent,
}) => {

  let Icon = ''

  if (isParent) {
    if (disabled) {
      Icon = ParentHospitalDisabled
    } else {
      Icon = ParentHospital
    }
  } else {
    if (disabled) {
      Icon = ChildHospitalDisabled
    } else {
      Icon = ChildHospital
    }
  }

  return (
    <img
      src={Icon}
      alt="Больница"
    /> 
  )
})

HospitalIcons.displayName = 'HospitalIcons'

export default HospitalIcons
