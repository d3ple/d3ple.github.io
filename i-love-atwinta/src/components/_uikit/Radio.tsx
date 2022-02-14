import React, { memo } from 'react'

import MaterialRadio from '@mui/material/Radio'
import { styled } from '@mui/material'

// Interfaces
import { IRadioAllowedProps } from '~/store/types/vendor'

const defaultStyling = {
  color: "grey.100",
  background: 'transparent',
  '& ~ &': {
    background: 'transparent',
  },
  '&:hover': {
    background: 'transparent',
  },
}

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 24,
  height: 24,
  boxShadow: 'none',
  border: `2px solid ${theme.palette.action.disabledBackground}`,
  'input:disabled ~ &': {
    boxShadow: 'none',
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${theme.palette.primary.main}`,
  '&:before': {
    display: 'block',
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z' fill='%231874FD'/%3E%3C/svg%3E%0A")`,
    backgroundPositionX: `30%`,
    backgroundPositionY: `30%`,
    backgroundRepeat: 'no-repeat',
    content: '""',
  }
}));

const Radio: React.FC<IRadioAllowedProps> = memo(({
  icon,
  checkedIcon,
  sx,
  ...props
}) => {

  return (
    <MaterialRadio
      icon={icon ? icon : <BpIcon />}
      checkedIcon={checkedIcon ? checkedIcon : <BpCheckedIcon />}
      sx={{
        ...defaultStyling,
        ...sx,
        marginRight: '9px',
      }}
      {...props}
    />
  )
})

Radio.displayName = 'Radio'

export default Radio