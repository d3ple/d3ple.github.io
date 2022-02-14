import React from 'react'

import { Checkbox as MaterialCheckbox } from '@mui/material'

// Interfaces
import { ICheckoboxAllowedProps } from '~/store/types/vendor'
import { useField } from 'formik'
import { CheckboxProps } from '@mui/material'

const FormikCheckbox: React.FC<ICheckoboxAllowedProps> = ({...props }) => {
  // eslint-disable-next-line
  const [field, meta] = useField(props.name)

  const defaultCheckboxConfig: CheckboxProps = {
    ...field,
    ...props,
    onChange: field.onChange,
    checked: field.value,
    value: field.value,
    disabled: props.disabled,
    sx: {
      color: "grey.100",
      '&.Mui-checked': {
        color: "primary",
      },
      '&.Mui-disabled': {
        color: "primary",
      },
      ...props.sx,
    }
  }

  return (
    <MaterialCheckbox
      {...defaultCheckboxConfig}
    />
  )
}

export default FormikCheckbox