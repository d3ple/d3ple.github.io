import { useField } from 'formik'

import React, { memo } from 'react'
import { IMaskInput } from 'react-imask'

import { FormControl, Input, InputLabel } from '@mui/material'
import { InputProps } from '@mui/material'
// Types
import { ITextInputAllowedPropsWithMask } from '~/store/types/vendor'
import CheckIcon from '~/components/icons/CheckIcon'
import { FormHelperText } from '@mui/material';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string | DateConstructor,
}
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={props.mask} // Note: есть в доке react-imask
        unmask={true}
        
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        // eslint-disable-next-line
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);


const TextFieldWithMask: React.FC<ITextInputAllowedPropsWithMask> = ({
  placeholder = 'Пожалуйста, введите текст',
  label,
  mask = Date,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name)
  const touched = meta && meta.touched

  const defaultTextFieldConfig: InputProps & { focused?: boolean } = {
    ...props,
    placeholder: placeholder,
    color: touched && !meta.error ? 'success' : 'primary',
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
      '& .MuiInput-input': {
        paddingLeft: '13px',
        paddingBottom: '15px',
      },
      '& .MuiInput-input::placeholder': {
        paddingLeft: '0px',
      }
    }
  }

  const stylesForLabel = {
    marginLeft: '-14px', // fix strange default label position
  }

  if (meta && meta.touched && meta.error) {
    defaultTextFieldConfig.error = true
  } else if (!meta.error) {
    defaultTextFieldConfig.error = false
    defaultTextFieldConfig.color = 'success'
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel sx={stylesForLabel} style={{
        color: '#718096',
        fontWeight: 400,
      }}>
        {label}
      </InputLabel>
      <Input
        {...defaultTextFieldConfig}
        value={field.value}
        onChange={field.onChange}
        // eslint-disable-next-line
        inputComponent={TextMaskCustom as any}
        inputProps={{ mask: mask }}
        onFocus={() => helpers.setTouched(true)}
      />
      <FormHelperText sx={{ margin: '3px 0 0 0'}} error>{ meta && meta.touched && meta.error ? meta.error : ' '}</FormHelperText>
    </FormControl>
  )
}

export default memo(TextFieldWithMask)