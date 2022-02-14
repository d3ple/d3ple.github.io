// Данный файл хранит типы, которые мы позволяем передавать для кастомных компонентов 
// по большей части это будет Material-Ui

import { SxProps } from '@mui/system'
import React, { ChangeEvent } from 'react'

interface IBaseControlProps {
  className?: string,
  disabled?: boolean,
  sx?: SxProps,
  fullWidth?: boolean,
}

export interface ITextInputAllowedProps extends IBaseControlProps {
  name: string,
  placeholder?: string,
  value?: string,
  label?: string,
  noSpaces?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line
  inputComponent?: any,
  focused?: boolean,
  max?: number,
  min?: number,
  autoFocus?: boolean,
}

export interface ITextInputAllowedPropsWithMask extends ITextInputAllowedProps {
  mask?: string | DateConstructor,
}

export interface ICheckoboxAllowedProps extends IBaseControlProps {
  name: string,
  value?: boolean,
  icon?: React.ReactNode,
  checkedIcon?: React.ReactNode,
  label?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
}

export interface IRadioAllowedProps extends IBaseControlProps {
  name?: string,
  value?: string | null,
  chosenValue?: string | null,
  icon?: string,
  checkedIcon?: React.ReactNode,
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined
  required?: boolean,
}

export interface IButtonAllowedProps extends IBaseControlProps {
  type?: 'button' | 'submit',
  buttonType?: 'outlined' | 'contained' | 'text',
  accent?: ButtonAccents
  value?: boolean,
  rounded?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function,
  size?: "medium" | "large" | "small",
  mobileView?: boolean,
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}


// ------------------------------------------------ ----------------------->
// Enums - in future will create seperate folder

export enum ButtonAccents {
  DEFAULT = 'default',
  LIGHT = 'light',
}
