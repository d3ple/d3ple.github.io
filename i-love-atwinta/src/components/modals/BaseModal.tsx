import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@mui/material'
import { Box } from '@mui/system'

// Components
import CloseButton from '~/components/_uikit/CloseButton'
// Styles
import s from '~/styles/components/modals/BaseModal.module.scss'
import Button from '~/components/_uikit/Button'
import { ButtonAccents } from '~/store/types/vendor'

interface Props {
  isOpened: boolean,
  onClose: () => void,
  onConfirm: () => void,
  textConfirm?: string,
  textClose?: string,
  width?: number | string,
  hideCloseButton?: boolean,
  maxButtonWidth?: string, // px
  centered?: boolean,
}

export const BaseModal: React.FC<Props> = observer(({
  isOpened = false,
  width = '510px',
  children,
  onConfirm,
  onClose,
  textClose = 'Отменить',
  textConfirm = 'Подтвердить',
  hideCloseButton = false,
  maxButtonWidth,
  centered = false
}) => {
  const style = {
    width: '100%',
    maxWidth: width,
    bgcolor: 'white',
    borderRadius: '10px',
    px: 0,
    py: 0,
  };

  const [open, setOpen] = useState(isOpened);

  useEffect(() => {
    setOpen(isOpened)
  }, [isOpened])

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          '&.MuiPaper-root': {
            overflowY: 'unset',
            boxShadow: 'none',
          }
        }
      }}
    >
      <div className={s.modalWrapper}>
        <Box sx={style}>
          { !hideCloseButton && <CloseButton onClose={handleClose}/> }
          { children }
          <div className={s.modalOptions} style={{ display: 'grid', gridTemplateColumns: centered ? '1fr' : '1fr 1fr' }}>
            {
              textClose && 
              <Button
                buttonType='outlined'
                accent={ButtonAccents.LIGHT}
                onClick={handleClose}
                sx={{ marginRight: '10px', }}
              >{ textClose }</Button>
            }
            <Button
              onClick={onConfirm}
              sx={{ 
                padding: centered ? '4px 7px' : '0 7px',
                width: maxButtonWidth ? maxButtonWidth : 'auto',
                margin: centered ? '0 auto' : '0',
              }}
            >{ textConfirm }</Button>
          </div>
        </Box>
      </div>
    </Dialog>
  )
})

BaseModal.displayName = 'BaseModal'

export default BaseModal