import React, { memo, useEffect, useState } from 'react'

// Components
import BaseModal from '~/components/modals/BaseModal'
import ErrorText from '~/components/_uikit/ErrorText'
// Styles
import s from '~/components/modals/error/ErrorModal.module.scss'
// Utils
import { goToExternalService } from '~/utils/helpers'

interface Props {
  isOpened: boolean,
  width?: number,
  onClose: () => void,
}

export const ErrorModal: React.FC<Props> = memo(({
  isOpened = false,
  width = '510px',
  children,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(isOpened);

  useEffect(() => {
    setOpen(isOpened)
  }, [isOpened])

  const shareProblem = goToExternalService

  return (
    <BaseModal
      width={width}
      isOpened={open}
      onClose={onClose}
      onConfirm={shareProblem}
      textClose = 'Закрыть'
      textConfirm = 'Рассказать о проблеме'
    >
      <div className={s.errorTitle}>
        <ErrorText>Ошибка</ErrorText>
      </div>
      { children }
    </BaseModal>
  )
})

ErrorModal.displayName = 'ErrorModal'

export default ErrorModal