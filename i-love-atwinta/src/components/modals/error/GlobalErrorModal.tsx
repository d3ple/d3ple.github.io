import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'

// Components
import BaseModal from '~/components/modals/BaseModal'
import ErrorText from '~/components/_uikit/ErrorText'
// Styles
import s from '~/components/modals/error/ErrorModal.module.scss'
// hooks
import { useStore } from '~/hooks/useStore'
import { useAppointmentSteps } from '~/hooks/useAppointmentSteps'

interface Props {
  isOpened: boolean,
  width?: number,
}

export const GlobalErrorModal: React.FC<Props> = observer(({
  isOpened = false,
  width = '510px',
}) => {
  const store = useStore()
  const navigate = useNavigate()
  const errorMessageText = store.egisErrorStore.egisErrorMessage
  const { recalculateStepsStatusBasedOnRoutes } = useAppointmentSteps()

  const onClose = useCallback(() => {
    const redirectTo = store.egisErrorStore.redirectOnError
    if (redirectTo) {
      navigate(redirectTo, { replace: true })
      recalculateStepsStatusBasedOnRoutes(redirectTo)
    }
    store.egisErrorStore.setIsEgisError(false)
  }, [ navigate, store.egisErrorStore, recalculateStepsStatusBasedOnRoutes ])

  return (
    <BaseModal
      width={width}
      isOpened={isOpened}
      onClose={onClose}
      onConfirm={onClose}
      textClose=''
      textConfirm='Ок'
      maxButtonWidth='100px'
      centered
    >
      <div className={s.errorTitle}>
        <ErrorText>Ошибка</ErrorText>
      </div>
      <Typography>{ errorMessageText }</Typography>
    </BaseModal>
  )
})

export default GlobalErrorModal