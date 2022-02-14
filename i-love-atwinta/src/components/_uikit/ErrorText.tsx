import React from 'react'

import { Typography } from '@mui/material'

interface Props {}

const ErrorText: React.FC<Props> = ({ children }) => {
  return (
    <Typography variant="errorText">{ children }</Typography>
  )
}

export default ErrorText
