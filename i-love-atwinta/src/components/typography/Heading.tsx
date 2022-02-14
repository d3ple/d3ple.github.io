import React from 'react'

import s from '~/styles/components/typography/Heading.module.scss'

enum HeadingList {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
}

type TAvailableColors = 'dark'|'blueish'|'grey'

interface Props {
  type?: 'h1'|'h2'|'h3'|HeadingList,
  typographyType?: 'accent'|'',
  color?: TAvailableColors,
}

const Heading: React.FC<Props> = ({ type = 'h1', children, color = 'dark', typographyType = '', ...props }) => {
  const typographyClass = typographyType ? s[`${type}-${typographyType}`] : ''

  const colorPalette: Record<TAvailableColors, string> = {
    'dark': s.dark,
    'blueish': s.blueish,
    'grey': s.grey,
  }

  const sizePalette: Record<HeadingList, string> = {
    [HeadingList.H1]: s.h1,
    [HeadingList.H2]: s.h2,
    [HeadingList.H3]: s.h3,
  }

  return React.createElement(
    `${type}` || 'h1',
    {
      ...props,
      className: `${colorPalette[color]} ${sizePalette[type]} ${typographyClass}`
    }, 
    children
  );
}

export default Heading