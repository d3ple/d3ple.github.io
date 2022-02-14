import React from 'react'

interface Props {}
import s from '~/styles/components/icons/Icons.module.scss'
import { goToExternalService } from '~/utils/helpers'

export const Logo: React.FC<Props> = ({}) => {
  const handleLogoClick = () => {
    goToExternalService('/', '_self')
  }
  
  return (
    <div className={s.logoWrapper} onClick={handleLogoClick}>
      <div className={s.logoContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 51 51" fill="none">
          <circle cx="25.5" cy="25.5" r="21.5" stroke="#FA5773" strokeWidth="8"/>
          <rect x="12.75" y="30.1362" width="9.27273" height="25.5" transform="rotate(-90 12.75 30.1362)" fill="#FA5773"/>
          <rect x="20.8637" y="12.75" width="9.27273" height="25.5" fill="#FA5773"/>
        </svg>
      </div>
      <h1 className={s.logoTitle}>Онлайн Здрав</h1>
    </div>
  )
}

export default Logo