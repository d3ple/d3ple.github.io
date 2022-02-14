import { SxProps, Typography } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import React from 'react'

// Styles
import s from '~/components/popups/LocationChangerPopUp.module.scss'
import Button from '~/components/_uikit/Button'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props {
  open: boolean,
  cityRegionName: string,
  onClose: () => void
}

const LocationChangerPopUp: React.FC<Props> = ({
  open,
  onClose,
  cityRegionName
}) => {
  const defaultSxForButtons: SxProps = {
    padding: '6px 7px',
  }

  const handleChangeRegion = () => goToExternalService('/kemerovo/spisok-mo', '_self')

  return (
    <>
      {open ? (
        <ClickAwayListener onClickAway={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onClose()
        }}>
          <div className={s.popup}>
            <Typography variant='small'>Вы находитесь</Typography>
            <Typography variant='body2'>{ cityRegionName }</Typography>
            <div className={s.popupWrapperControls}>
              <Button sx={defaultSxForButtons} size='small' onClick={onClose}>Да, верно</Button>
              <Button sx={defaultSxForButtons} buttonType='outlined' size='small' onClick={handleChangeRegion}>Выбрать другой</Button>
            </div>
          </div>
        </ClickAwayListener>
      ) : null}
    </>
  )
}

export default LocationChangerPopUp
