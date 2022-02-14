import React, { memo } from 'react'

import { SxProps, Typography } from '@mui/material'
// Components
import ErrorModal from '~/components/modals/error/ErrorModal'
import { Box } from '@mui/system'
// Styles
import s from '~/components/modals/error/ErrorModal.module.scss'

interface Props {
  isError: boolean,
  onClose: () => void
}

const ErrorNotAbleToAssign: React.FC<Props> = memo(({
  isError,
  onClose,
}) => {

  const styles: SxProps = {
    display: 'inline-block',
    color: 'grey.200',
  }

  return (
    <ErrorModal
      onClose={onClose}
      width={510}
      isOpened={isError}
    >
      <Box mb={12} >
        <Typography sx={styles} variant='body3'>Не удалось найти пациента с такими данными.</Typography>
        <Box mt={10}>
          <Typography sx={styles} variant='body3'>Возможно вы:</Typography>
        </Box>
      </Box>
      <div className={s.errorAssign}>
        <div className={s.errorAssignItem}>
          <Typography sx={{
            ...styles,
            marginRight: '8px',
          }} variant='body3'>1. </Typography>
          <Typography sx={{
            ...styles,
          }} variant='body3'>Не прикреплены к данном поликлинике.</Typography>
        </div>
        <div className={s.errorAssignItem}>
          <Typography sx={{
            ...styles,
            marginRight: '6px',
          }} variant='body3'>2. </Typography>
          <Typography sx={{
            ...styles,
          }} variant='body3'>Сменили полис.</Typography>
        </div>
        <div className={s.errorAssignItem}>
          <Typography sx={{
            ...styles,
            marginRight: '6px',
          }} variant='body3'>3. </Typography>
          <Typography sx={{
            ...styles,
          }} variant='body3'>Неверно внесли свои данные.</Typography>
        </div>
      </div>
    </ErrorModal>
  )
})

ErrorNotAbleToAssign.displayName = 'ErrorNotAbleToAssign'

export default ErrorNotAbleToAssign
