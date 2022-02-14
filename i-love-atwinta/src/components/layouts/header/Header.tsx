import React from 'react'
import Logo from '~/components/icons/Logo'

import Wrapper from '~/components/layouts/wrapper/Wrapper'
import s from '~/components/layouts/header/Header.module.scss'
import Button from '~/components/_uikit/Button'
import LocationChanger from '~/components/common/LocationChanger/LocationChanger';
import { useNavigate } from 'react-router-dom'
import CloseIcon from '~/assets/icons/close.svg'

interface Props {
  isOpenedMobileMenu?: boolean,
  closeMobileMenu?: () => void,
}

const HeaderMenu: React.FC<Props> = ({
  isOpenedMobileMenu,
  closeMobileMenu
}) => {
  return (
    <div className={s.headerLogoWrapper}>
      <div className={s.headerLogoContainer}>
        <Logo />
        { isOpenedMobileMenu && closeMobileMenu ? <img style={{ marginBottom: '3px'}} onClick={closeMobileMenu} src={CloseIcon}/> : <LocationChanger /> }
      </div>
    </div>
  )
}
// Layout смотреть в Header.module.scss - Первые ноды всегда по сетке строятся
const Header: React.FC<Props> = ({
  isOpenedMobileMenu,
  closeMobileMenu,
}) => {
  const navigate = useNavigate()

  const handleNewAppointment = () => {
    navigate('/new-patient', { replace: true })
  }

  return (
    <header className={s.header}>
      <Wrapper>
        <HeaderMenu
          isOpenedMobileMenu={isOpenedMobileMenu}
          closeMobileMenu={closeMobileMenu}
        />
        <div className={s.headerButton}>
          <Button
            onClick={handleNewAppointment}
          >Записаться на прием</Button>
        </div>
      </Wrapper>
      <Wrapper>
        <div className={s.headerDesktopMenu}>
          <a href={`${process.env.EXTERNAL_WEB_SITE}/moskva/spisok-mo/`} className={s.headerDesktopMenuItem}>
            Медицинские организации
          </a>
          <a href={`${process.env.EXTERNAL_WEB_SITE}/help`} className={s.headerDesktopMenuItem}>
            Помощь
          </a>
          <a href={`${process.env.EXTERNAL_WEB_SITE}/about`} className={s.headerDesktopMenuItem}>
            О сервисе
          </a>
        </div>
        <div className={s.headerButtonMobile}>
          <Button
            onClick={handleNewAppointment}
          >Записаться на прием</Button>
        </div>
      </Wrapper>
    </header>
  )
}

export default Header