import React, { ReactElement } from 'react'

// Styles
import s from '~/App.module.scss'
import mobileMenu from '~/components/layouts/mobile-menu/MobileMenu.module.scss'
// Components
import Button from '~/components/_uikit/Button'
import LinkText from '~/components/typography/LinkText'
import SocialMediaIcons from '~/components/common/SocialMediaIcons/SocialMediaIcons'
import MobileIcons from '~/components/icons/MobileMenuIcons/MobileIcons'
// Layout
import Header from '~/components/layouts/header/Header'
// Service
import { LINKS } from '~/utils/services/constants'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  handlerOpenMenu: () => void,
}

interface MenuOpenProps {
  isMobileViewOpened: boolean,
  onClose: () => void,
}

export const MobileMenuAdditional: React.FC<MenuOpenProps> = ({
  isMobileViewOpened,
  onClose
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const links: ReactElement<typeof LinkText>[] = LINKS
    .map(({ name, value }, idx) => (<div key={idx} ><LinkText src={value as string}>{name}</LinkText></div>))

  const handleAssign = () => {
    if (pathname !== '/new-patient') {
      onClose()
      navigate('/new-patient', { replace: true })
    } else {
      onClose()
    }
  }

  return isMobileViewOpened ?
    <div className={mobileMenu.mobileMenu}>
      <Header 
        isOpenedMobileMenu={isMobileViewOpened}
        closeMobileMenu={onClose}
      />
      <nav className={mobileMenu.mobileMenuWrapper}>
        <div className={mobileMenu.mobileMenuLinksContainer}>
          { links }
        </div>
        <div className={mobileMenu.mobileMenuButtonContainer}>
          <Button onClick={handleAssign}>Записаться на прием</Button>
          <div className={mobileMenu.mobileMenuSocialMedia}>
            <SocialMediaIcons />
          </div>
        </div>
      </nav>
    </div> : null
}

const MobileMenu: React.FC<Props> = ({
  handlerOpenMenu
}) => {
  return (
    <>
      <nav className={s.applicationMobileMenu}>
        <a href='/' className={s.applicationMobileMenuItem}>
          <MobileIcons type='active' iconType='organizations'/>
          Организации
        </a>
        <a href={`${process.env.EXTERNAL_WEB_SITE}/help`} className={s.applicationMobileMenuItem}>
          <MobileIcons type='inactive' iconType='support'/>
          Помощь
        </a>
        {/* ToDo - пока нет menu */}
        <div className={s.applicationMobileMenuItem} onClick={handlerOpenMenu}>
          <MobileIcons type='inactive' iconType='menu'/>
          Меню
        </div>
      </nav>
    </>
  )
}

export default MobileMenu
