import { SxProps, Typography } from '@mui/material'
import React from 'react'

// Base Modal
import ErrorModal from '~/components/modals/error/ErrorModal'

interface Props {
  isOpened: boolean,
  message: string,
  onClose: () => void
}

const AppointmentErrorModal: React.FC<Props> = ({
  isOpened,
  onClose,
  message
}) => {

  const styles: SxProps = {
    display: 'inline-block',
    color: 'grey.200',
  }

  return (
    <ErrorModal
      isOpened={isOpened}
      onClose={onClose}
    >
      <Typography sx={{
        ...styles,
      }} variant='body3'>{ message }</Typography>
    </ErrorModal>
  )
}

export default AppointmentErrorModal
