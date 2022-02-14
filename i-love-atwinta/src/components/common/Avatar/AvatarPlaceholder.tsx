import React from 'react'

import s from '~/components/common/Avatar/Avatar.module.scss'

import avatarPlaceholderMale from '~/assets/icons/patient.svg'
import avatarPlaceholderFemale from '~/assets/icons/patient-female.svg'

interface Props {
  photo?: string,
  gender?: 'male' | 'female'
}

const AvatarPlaceholder: React.FC<Props> = ({ photo, gender }) => {

  return (
    <div className={s.avatarPlaceholder}>
      <img src={photo ? photo : gender === 'male' ? avatarPlaceholderMale : avatarPlaceholderFemale } />
    </div>
  )
}

export default AvatarPlaceholder
