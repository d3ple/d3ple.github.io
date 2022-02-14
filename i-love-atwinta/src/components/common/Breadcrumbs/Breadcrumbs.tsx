import { Typography } from '@mui/material'
import React from 'react'
import { 
  Link,
} from 'react-router-dom'

// Icons
import ArrowLeft from '~/assets/icons/arrowLeft.svg'
// Styles
import s from '~/components/common/Breadcrumbs/Breadcrumbs.module.scss'

interface Props {
  to: string,
  text: string,
  external?: boolean
}

// В будщем можно сделать несколько компонентов
const Breadcrumbs: React.FC<Props> = ({ to, text, external }) => {
  if (external) {
    return (
      <a href={to} className={s.breadcrumb}>
        <img src={ArrowLeft}/>
        <Typography variant='small'>{ text }</Typography>
      </a>
    )
  }

  return (
    <Link to={to} className={s.breadcrumb}>
      <img src={ArrowLeft}/>
      <Typography variant='small'>{ text }</Typography>
    </Link>
  )
}

export default Breadcrumbs