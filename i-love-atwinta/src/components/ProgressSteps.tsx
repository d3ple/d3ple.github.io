import React from 'react'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// Types
// import RootStore from '~/store/modules/RootStore';
// Hooks
import { useAppointmentSteps } from '~/hooks/useAppointmentSteps';
// Styles
import s from '~/components/ProgressSteps.module.scss'
import { observer } from 'mobx-react-lite';
import { styled, Typography } from '@mui/material';

interface Props {}

const LinearProgressStyled = styled(LinearProgress)(() => ({
  height: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#CBD5E0',
  },
}))

const ProgressSteps: React.FC<Props> = observer(({}) => {
  const { currentStep, currentProgressPercent, currentProgressStep, steps } = useAppointmentSteps() 

  return (
    <div className={s.progressBar}>
      <div className={s.progressBarTitleContainer}>
        <div className={s.progressBarTitle}>
          <Typography variant='body2' sx={{
            color: 'primary.main',
            fontSize: '0.875rem',
          }}>
            { currentStep && currentStep.title.toUpperCase() }
          </Typography>
        </div>
        <div className={s.progressBarSteps}>
          <Typography variant='body2' sx={{
            color: '#CBD5E0',
            fontSize: '0.875rem',
          }}>
            { `${currentProgressStep} / ${steps.length}` }
          </Typography>
        </div>
      </div>
      <LinearProgressStyled
        value={currentProgressPercent}
        variant='determinate'
        color='primary'
        sx={{
          '&MuiLinearProgress-bar1Determinate': {
            height: '2px',
          }
        }}
      />
    </div>
  )
})

export default ProgressSteps
