import React from 'react'
import { NavLink } from 'react-router-dom'

import s from '~/styles/components/typography/LinkText.module.scss'

interface Props {
  type?: 'inner'|'external',
  src: string,
  tag?: 'a' | 'NavLink'
}

const LinkText: React.FC<Props> = ({ type = 'inner', src, tag = 'a', ...props}) => {

  if (tag === 'NavLink') {
    return <NavLink to={src} className={type === 'inner' ? s.linkInner : s.linkDefault}>
      { props.children }
    </NavLink>
  }

  return (
    <a href={src} rel="noopener noreferrer" target='_blank' className={type === 'inner' ? s.linkInner : s.linkDefault}>
      { props.children }
    </a>
  )
}

export default LinkText