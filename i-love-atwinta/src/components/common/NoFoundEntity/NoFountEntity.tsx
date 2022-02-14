import React from 'react'
import { Typography } from '@mui/material'

// Styles
import s from '~/components/common/NoFoundEntity/NoFountEntity.module.scss'
// Components
import Button from '~/components/_uikit/Button'

interface Props {
  title?: string,
  subtitle?: string,
  buttonText?: string,
  hideControls?: boolean,
  titleMaxWidth?: number, 
  onClick?: () => void,
}

const NoFountEntity: React.FC<Props> = ({
  title = 'Нет данных',
  subtitle = 'Расскажите нам об этом!',
  buttonText = 'Сообщить',
  hideControls = false,
  titleMaxWidth,
  onClick
}) => {
  return (
    <div className={s.noData}>
      <Typography variant='noFoundTitle' sx={{
        color: '#CBD5E0',
        lineHeight: '60px',
        maxWidth: titleMaxWidth ? `${titleMaxWidth}px` : '580px',
        textAlign: 'center',
      }}>{ title }</Typography>
      <Typography variant='subtitle1' sx={{
        color: '#CBD5E0',
        lineHeight: '45px',
        textAlign: 'center',
      }}>{ subtitle }</Typography>
      {
        !hideControls && onClick && (
        <Button
          onClick={onClick}
          sx={{
            width: '100%',
            maxWidth: '328px',
            marginTop: '55px',
            padding: '26px 50px',
            fontSize: '20px',
            borderRadius: '7px',
          }}
        >{ buttonText }</Button>
        )
      }
    </div>
  )
}

export default NoFountEntity
