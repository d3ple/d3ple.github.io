import React, { ReactElement } from 'react'

import { Typography } from '@mui/material'
// Components
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import LinkText from '~/components/typography/LinkText'
import SocialMediaIcons from '~/components/common/SocialMediaIcons/SocialMediaIcons'
import { Logo } from '~/components/icons/Logo'
// Styles
import s from '~/components/layouts/footer/Footer.module.scss'
// Utils
import { LINKS } from '~/utils/services/constants'

interface Props {}
const Footer: React.FC<Props> = ({}) => {

  const links: ReactElement<typeof LinkText>[] = LINKS
    .map(({ name, value }, idx) => (<LinkText key={idx} src={value as string}>{name}</LinkText>))

  return (
    <footer className={s.footer}>
      <Wrapper>
        <div className={s.footerUpper}>
          <section className={s.footerUpperLogoSection}>
            <Logo />
          </section>
          <section className={s.footerUpperLinksSection}>
            <div className={s.footerAppInfo}>
              <Typography variant='body3'>Федеральный портал записи к врачу в государственные и частные медицинские организации страны</Typography>
            </div>
            <div className={s.footerLinks}>
              <div className={s.footerLinksContainer}>
                {links.map((item, index) => (<div key={index}>
                  {item}
                </div>))}
              </div>
              <div className={s.footerSocialMediaContainer}>
                {/* Вынес в отдельаный компонент, на случай расширения и переиспользования соцок */}
                <SocialMediaIcons />
              </div>
            </div>
          </section>
        </div>
        <section className={s.footerDown}>
          <Typography variant="bodyWeak2">{'Информация, представленная на сайте, не может быть использована для постановки диагноза, назначения лечения и не заменяет прием врача.'.toUpperCase()}</Typography>
          <div className={s.footerCopyrightText}>
            <Typography variant="bodyWeak" sx={{
              lineHeight: '15px',
            }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              © ИСПД “Запись к врачу” 2021 ООО "Онлайн Дозор", 650000, г. Кемерово, ул. Радищева строение 2/2 Литер 3 помещение 3; ИНН 4205356421, КПП 420501001
            </Typography>
            <div>
              <Typography variant="bodyWeak" >
              ОГРН 1174205015203.
              </Typography>
            </div>
          </div>
        </section>
      </Wrapper>
    </footer>
  )
}

export default Footer
