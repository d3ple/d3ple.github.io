import React, { memo, useEffect, useState } from 'react'

import Radio from '~/components/_uikit/Radio'
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import { useField } from 'formik'

interface Props {
  name: string,
  options: {
    value: string | number,
    label: string
  }[]
}

const FormikRadioGroup: React.FC<Props> = memo(({ name, options }) => {
  const [errorState, setErrorState] = useState<{error: boolean, helperText: string}>({ error: false, helperText: '' })
  const [field, meta] = useField(name)

  const styling = {
    display: 'flex',
    justifyContent: 'base',
    alginItems: 'center',
    gap: '19px',
    marginLeft: '12px', // strange shit
  }

  useEffect(() => {
    if (meta.touched && meta.error) {
      setErrorState({ error: true, helperText: 'Обязательно для выбора'})
    } else {
      setErrorState({ error: false, helperText: ''})
    }
  }, [meta.touched, meta.error])

  return (
    <>
      <RadioGroup name={name} value={field.value} onChange={field.onChange}>
        <Box sx={styling}>
          { options.map((item, idx) => {
              return <FormControlLabel key={idx} control={
                <Radio />
              }
              label={<Typography variant='small'>{item.label}</Typography>}
              value={item.value}
            />
            })
          }
        </Box>
      </RadioGroup>
      <div>{ errorState.error && errorState.helperText }</div>
    </>
  )
})

FormikRadioGroup.displayName = 'FormikRadioGroup'

export default FormikRadioGroup
