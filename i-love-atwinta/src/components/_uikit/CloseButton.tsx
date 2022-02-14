import React from 'react'

import Button from '~/components/_uikit/Button'
import CloseIcon from '~/assets/icons/close.svg'

interface Props {
  onClose: () => void,
}

const CloseButton: React.FC<Props> = ({ onClose }) => {
  return (
    <Button
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: {
          xs: '20px',
          sm: 'calc(36px/2 * -1)',
        }, // CloseButtonWidth / 2
        top: {
          xs: '10px',
          sm: 'calc(36px/2 * -1)', // CloseButtonHeight / 2
        }, 
        padding: '0',
        zIndex: '10000', // be careful
        backgroundColor: 'white',
        minWidth: 'auto',
        height: {
          xs: '24px',
          sm: '36px', 
        }, 
        width: {
          xs: '24px',
          sm: '36px', 
        },
        borderRadius: '50%',
        boxShadow: {
          sx: 'none',
          sm: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
        '&.MuiButton-containedPrimary:hover': {
          backgroundColor: 'white',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <img src={CloseIcon}/>
    </Button>
  )
}

export default CloseButton