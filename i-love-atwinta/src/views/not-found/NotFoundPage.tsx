import { Typography } from '@mui/material'
import React from 'react'

// Components
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import LinkText from '~/components/typography/LinkText'
// Styles
import s from '~/views/not-found/NotFoundPage.module.scss'

interface Props {}

const NotFoundPage: React.FC<Props> = ({}) => {
  return (
    <Wrapper>
      <div className={s.notFound}>
        <div className={s.notFoundIllustration}></div>
        <div className={s.title}>
          <Typography variant='noFoundTitle' sx={{ color: 'error.main' }}>{'Страница удалена или ее не было'.toUpperCase()}</Typography>
        </div>
        <div className={s.message}>
          <div>
            <Typography variant='subtitle1'>
              Откройте <LinkText tag='NavLink' src='appointment/hospital' type='external'>список больниц</LinkText> доступных для <LinkText tag='NavLink' src='new-patient' type='external'>онлайн записи</LinkText>
              <br />Или вернитесь на <LinkText tag='NavLink' src='new-patient' type='external'>главную страницу</LinkText>
            </Typography>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default NotFoundPage
