import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog, Typography } from '@mui/material'
import { Box } from '@mui/system'

// Components
import CloseButton from '~/components/_uikit/CloseButton'
// Styles
import s from '~/styles/components/modals/BaseModal.module.scss'

interface Props {
  isOpened: boolean,
  onClose: () => void,
}

export const SuccessModal: React.FC<Props> = observer(({
  isOpened = false,
  onClose
}) => {

  const style = {
    width: '100%',
    maxWidth: '510px',
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
          <CloseButton onClose={handleClose}/>
          <div className={s.modalCenter}>
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M53.3973 16.3529C53.9413 16.8978 54.2471 17.6365 54.2471 18.4066C54.2471 19.1768 53.9413 19.9154 53.3973 20.4604L25.3035 48.5541C24.7586 49.0982 24.0199 49.4039 23.2498 49.4039C22.4796 49.4039 21.7409 49.0982 21.196 48.5541L8.60229 35.9604C8.08893 35.4094 7.80946 34.6808 7.82272 33.9278C7.83601 33.1749 8.14101 32.4566 8.67351 31.9241C9.20597 31.3916 9.92436 31.0866 10.6773 31.0733C11.4302 31.06 12.1588 31.3395 12.7098 31.8529L23.2498 42.3929L49.2898 16.3529C49.8346 15.8086 50.5732 15.5029 51.3435 15.5029C52.1135 15.5029 52.8525 15.8086 53.3973 16.3529Z" fill="#2AD966"/>
            </svg>

            <div style={{ maxWidth: '294px', textAlign: 'center' }}>
              <Typography variant='subtitle1' sx={{
                color: '#2D3748',
              }}>Запись прошла успешно</Typography>
            </div>

          </div>
        </Box>
      </div>
    </Dialog>
  )
})

SuccessModal.displayName = 'SuccessModal'

export default SuccessModal