import { TextFieldProps } from '@mui/material'

export type ReactChangeType = React.ChangeEvent<{ value: unknown, checked?: boolean|'on'|'off' }>

// NOTE: Странная фигня с вебпаком почему-то мой энион тип убивает сборщик Иногда.. :/
// type TextFieldBaseType = Omit<ITextInputAllowedProps, 'onChange'> & Omit<TextFieldProps, 'onChange' >
export type TextFieldConfig = TextFieldProps