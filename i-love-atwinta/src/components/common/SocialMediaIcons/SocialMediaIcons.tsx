import React, { ReactElement } from 'react'

// Social Media Icons
import Vk from '~/assets/icons/social-media/VK.svg'
import Facebook from '~/assets/icons/social-media/Facebook.svg'
import Instagram from '~/assets/icons/social-media/Instagram.svg'
import Ok from '~/assets/icons/social-media/Ok.svg'
// Styles
import s from '~/components/common/SocialMediaIcons/SocialMediaIcons.module.scss'

interface Props {}

interface ISocialMedia {
  alt: string,
  link: string,
  icon: string,
}

const SocialMediaIcons: React.FC<Props> = ({}) => {
  const links: ReactElement<ISocialMedia>[] = [
    { alt: 'Instagram', link: process.env.SOCIAL_MEDIA_ICON_INSTAGRAM, icon: Instagram },
    { alt: 'Vk', link: process.env.SOCIAL_MEDIA_ICON_VK, icon: Vk },
    { alt: 'Ok', link: process.env.SOCIAL_MEDIA_ICON_OK, icon: Ok },
    { alt: 'Facebook', link: process.env.SOCIAL_MEDIA_ICON_FACEBOOK, icon: Facebook }
  ].map((item, idx) => {
    return (
      <div className={s.socialMediaIcons} key={idx}>
        <a href={item.link}>
          <img src={item.icon} alt={item.alt} />
        </a>
      </div>
    )
  })

  return (
    <>
      { links }
    </>
  )
}

export default SocialMediaIcons
