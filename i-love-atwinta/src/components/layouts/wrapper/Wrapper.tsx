import React from 'react'

import s from '~/components/layouts/wrapper/Wrapper.module.scss'

interface Props {
  noPadding?: boolean,
}

const Wrapper: React.FC<Props> = ({ noPadding = false, children }) => {
  return (
    <div className={`${s.wrapper} ${noPadding ? s.wrapperNoPadding : ''}`}>
      { children }
    </div>
  )
}

export default Wrapper