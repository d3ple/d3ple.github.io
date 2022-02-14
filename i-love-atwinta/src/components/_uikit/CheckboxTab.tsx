import React from 'react'

import { CheckboxProps, FormLabel, styled } from '@mui/material'

// Components
import { Checkbox as MaterialCheckbox } from '@mui/material'
// Interfaces
import { ICheckoboxAllowedProps } from '~/store/types/vendor'
// Styling
import s from '~/styles/components/_uikit/CheckboxTab.module.scss'
import useIsMobileView from '~/hooks/useIsMobile'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '3px',
  width: 16,
  height: 16,
  backgroundColor: 'transparent',
  border: `2px solid ${theme.palette.action.disabledBackground}`,
  marginTop: '1px',
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'transparent',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    borderRadius: '1px',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-inside-1_788_25289' fill='white'%3E%3Crect width='10' height='10' rx='1'/%3E%3C/mask%3E%3Crect width='10' height='10' rx='1' fill='%231874FD' stroke='%231874FD' stroke-width='4' mask='url(%23path-1-inside-1_788_25289)'/%3E%3C/svg%3E%0A");`,
    backgroundPositionX: `1px`,
    backgroundPositionY: `1px`,
    backgroundRepeat: 'no-repeat',
    content: '""',
  }
});

const CheckboxTab: React.FC<ICheckoboxAllowedProps> = ({
  value,
  label,
  onChange,
  ...props
}) => {
  const { isSmallPhoneView } = useIsMobileView()

  const defaultCheckboxConfig: CheckboxProps = {
    ...props,
    icon: <BpIcon />,
    checkedIcon: <BpCheckedIcon />,
    onChange: onChange,
    checked: value,
    disabled: props.disabled,
    sx: {
      color: "grey.100",
      marginRight: '6px',
      '&.Mui-checked': {
        color: "primary",
      },
      '&.Mui-disabled': {
        color: "primary",
      },
    }
  }

  return (
    <div className={s.Label}>
      <FormLabel sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        lineHeight: '20px',
        fontSize: isSmallPhoneView ?
          '0.625rem'
        : 
          {
            xs: '0.75rem',
            sm: '0.875rem',
          },
      }}>
        <MaterialCheckbox
          {...defaultCheckboxConfig}
        />
        <div style={{ marginTop: '3px' }}>{ label }</div>
      </FormLabel>
    </div>
  )
}

export default CheckboxTab