import React from 'react'
import AvatarPlaceholder from '~/components/common/Avatar/AvatarPlaceholder'

interface Props {
  photo?: string,
  gender?: 'male' | 'female'
}

const Avatar: React.FC<Props> = ({
  photo,
  gender = 'male',
}) => {
  return (
    <>
      {
        photo ? <AvatarPlaceholder photo={photo}/> : <AvatarPlaceholder gender={gender}/>
      }
    </>
  )
}

export default Avatar
