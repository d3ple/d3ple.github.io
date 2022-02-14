import React from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

// Hooks
import { useStore } from '~/hooks/useStore'
// Types
import RootStore from '~/store/modules/RootStore'

interface Props {}

const RouterAuthorized: React.FC<Props> = observer(({ children }) => {
  const store: RootStore = useStore()
  // eslint-disable-next-line
  const newPatient = Boolean(store.patientStore.currentPatient)

  // some 
  return <>
    { newPatient ? children : <Navigate to="/new-patient" /> }
  </>
})

export default RouterAuthorized