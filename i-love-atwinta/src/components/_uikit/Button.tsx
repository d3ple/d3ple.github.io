import React from 'react'

import { Button as MaterialButton } from '@mui/material'

// Interfaces
import { ButtonAccents, IButtonAllowedProps } from '~/store/types/vendor'
import { SxProps } from '@mui/system'
// Styles
import s from '~/styles/components/_uikit/Button.module.scss'

const Button: React.FC<IButtonAllowedProps> = ({
  buttonType = 'contained',
  accent = ButtonAccents.DEFAULT,
  children,
  disabled,
  onClick,
  sx,
  rounded = false,
  size,
  type,
  mobileView = false,
  iconLeft = null,
  iconRight = null,
}) => {
  const handleClick = () => {
    onClick && onClick()
  }

  let styles: SxProps = {
    padding: '15px 14px',
    '&.MuiButton-containedInfo': {
      color: 'white',
    },
    '&.MuiButton-containedInfo:hover': {
      backgroundColor: 'info.main',
    },
    '&.MuiButton-containedInfo:focus': {
      backgroundColor: 'info.main',
    },
    '&.MuiButton-outlined': {
      borderColor: "action.disabledBackground",
      backgroundColor: "transparent",
      color: "grey.200",
    },
    '&.MuiButton-outlined.Mui-disabled': {
      borderColor: "#CBD5E0",
      color: '#CBD5E0'
    },
    '&.MuiButton-outlinedPrimary:hover': {
      borderColor: "primary.main",
      backgroundColor: "primary.main",
      color: "white",
    },
    '&.MuiButton-outlinedPrimary:focus': {
      borderColor: "primary.main",
      backgroundColor: "primary.main",
      color: "white",
    },
    '&.MuiButton-outlinedPrimary:active': {
      borderColor: "primary.dark",
      backgroundColor: "primary.dark",
      color: "white",
    },
    ...sx
  }

  if (mobileView) {
    styles = {
      ...styles,
      fontSize: '12px',
      padding: '9px 14px', 
      width: '110px',
    }
  }

  return (
    <MaterialButton
      type={type}
      variant={buttonType}
      onClick={() => handleClick()}
      disabled={disabled}
      color={accent === ButtonAccents.LIGHT ? 'info' : 'primary'}
      sx={{
        ...styles,
        ...(rounded && { borderRadius: '25px' })
      }}
      size={size}
    >
      <div className={s.buttonIconContainer}>
        { iconLeft }
        { children }
        { iconRight }
      </div>
    </MaterialButton>
  )
}

export default Button