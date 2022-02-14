import { Typography } from '@mui/material'
import React from 'react'

import ErrorText from '~/components/_uikit/ErrorText'
import GovernmentBuilding from '~/assets/icons/government-building.svg'
import PrivateBuilding from '~/assets/icons/private-building.svg'

// Styles
import s from '~/components/LoginPayAttentionBlock.module.scss'

interface Props {}

const LoginPayAttentionBlock: React.FC<Props> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.containerAttention}>
        <ErrorText>Обратите внимание!</ErrorText>
      </div>
      <Typography variant='emphasisBody1'>Чтобы посторонний человек не совершил запись в медицинскую организацию от вашего имени - введена обязательная авторизация для обращения в медицинские организации.</Typography>
      <div className={s.containerText}>
        <div className={s.itemsTitle}>
          <Typography variant='emphasisBody2' sx={{
            fontSize: {
              xs: '1.125rem',
              sm: '1.25rem'
            },
          }}>На портале Вам будут доступны:</Typography>
        </div>
        <div className={s.item}>
          <div className={s.payAttentionIcon}>
            <img src={GovernmentBuilding} />
          </div>
          <Typography variant='emphasisBody2'>Государственные медицинские учреждения</Typography>
        </div>
        <div className={s.item}>
          <div className={s.payAttentionIcon}>
            <img src={PrivateBuilding} />
          </div>
          <Typography variant='emphasisBody2'>Частные медицинские центры</Typography>
        </div>
      </div>
      <Typography variant='emphasisBody1'>В случае затруднений при входе на сайт после смены страхового медицинского полиса или паспорта, обратитесь в вашу поликлинику с просьбой изменить в базе номер полиса ОМС или данные паспорта.</Typography>
    </div>
  )
}

export default LoginPayAttentionBlock
