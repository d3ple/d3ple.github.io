import React, { memo, useCallback } from 'react'
import { TextField as CustomTextField } from '@mui/material'

// Interfaces
import { ITextInputAllowedProps } from '~/store/types/vendor'
import { TextFieldConfig } from '~/store/types/helpers'
// Validation
import { useField } from 'formik'
import CheckIcon from '~/components/icons/CheckIcon'

// import { TextFieldConfig } from '~/store/types/helpers'

const FormikTextField: React.FC<ITextInputAllowedProps> = memo(({
  placeholder = 'Пожалуйста, введите текст',
  name,
  ...props
}) => {
  const [field, meta] = useField(name)
  const touched = meta && meta.touched
  
  const handleBlur = useCallback((e: React.ChangeEvent<HTMLElement>) => {
    field.onBlur(e)
  }, [field])

  const defaultTextFieldConfig: TextFieldConfig = {
    ...field,
    ...props,
    onChange: field.onChange,
    onBlur: handleBlur,
    placeholder: placeholder,
    value: field.value,
    variant: 'standard',
    helperText: ' ',
    focused: meta && meta.touched,
    InputProps: {
      endAdornment: touched && !meta.error ? <CheckIcon /> : null,
      style: {
        color: '#5B6473',
        lineHeight: '16px',
      },
      sx: {
        '&::before': {
          borderWidth: '1px',
          borderBottomColor: `${touched && !meta.error ? '#2AD966' : '#CBD5E0'}`,
        },
        '&::after': {
          borderWidth: '1px',
        },
      }
    },
    InputLabelProps: {
      style: {
        color: '#718096',
        fontWeight: 400,
      },
    },
    sx: {
      '& .MuiInput-input': {
        paddingLeft: '13px',
        paddingBottom: '15px',
      },
      '& .MuiInput-input::placeholder': {
        paddingLeft: '0px',
      },
      '&.MuiInputBase-root::before' : {
        borderBottom: '1px solid yellow',
      }
    }
  }

  if (meta && meta.touched && meta.error) {
    defaultTextFieldConfig.error = true
    defaultTextFieldConfig.helperText = meta.error
  } else if (!meta.error) {
    defaultTextFieldConfig.color = 'success'
  }


  return (
    <CustomTextField
      {...defaultTextFieldConfig}
    />
  )
})

FormikTextField.displayName = 'FormikTextField'

export default FormikTextField