import React  from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'

// Hooks
import { useAppointmentSteps } from '~/hooks/useAppointmentSteps'
// Styling
import s from '~/components/views/appointment/UserAppointmentSteps/AppointmentSteps.module.scss'

interface Props {}

const AppointmentSteps: React.FC<Props> = observer(({}) => {
  const { goToStep, steps: dataSteps, currentStepIdx } = useAppointmentSteps()

  const steps = dataSteps.map((label, index) => {
    return {
      disabled: label.disabled,
      payload: (<span className={`${s.stepsLabel} ${label.disabled ? s.disabled : ''}`}>
          <span className={s.stepsLabelNumeric}>{index + 1}</span>
          <span className={s.stepsLabelText}>{label.title}</span>
        </span>)
    }
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs 
        variant='fullWidth'
        value={currentStepIdx}
        onChange={goToStep}
        // https://mui.com/components/tabs/#customization
        TabIndicatorProps={{ 
          children: (<span className='MuiTabs-indicatorSpan'></span>),
          style: {
            height: '7px',
            backgroundColor: '#1874FD',
          }
        }}
        sx={{
          '& .MuiTabs-indicator': {
            // Прячем дефолтный индикатор
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
        }}
      >
        { steps.map((item, idx) => (
          <Tab key={idx} label={item.payload} disabled={item.disabled} style={{height: '109px'}}/>
        ))}
      </Tabs>
    </Box>
  )
})

AppointmentSteps.displayName = 'AppointmentSteps'

export default AppointmentSteps
