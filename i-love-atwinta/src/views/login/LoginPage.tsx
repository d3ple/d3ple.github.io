import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer} from 'mobx-react-lite';

import { Box, Typography } from '@mui/material'

// Components
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import LoginForm from '~/components/forms/LoginForm'
import LoginPayAttentionBlock from '~/components/LoginPayAttentionBlock'
import Heading from '~/components/typography/Heading'
import LocationChangerPopUp from '~/components/popups/LocationChangerPopUp';
// Styles
import s from '~/views/login/LoginPage.module.scss'
// Types
import RootStore from '~/store/modules/RootStore'
import { INewPatientForm, INewPatientPayload } from '~/store/types/patient'
import { Sex } from '~/store/types/patient'
// Hooks
import { useStore } from '~/hooks/useStore'
import useIsMobileView from '~/hooks/useIsMobile';
// import { ILoginPayload } from '~/store/types/auth'
import ErrorNotAbleToAssign from '~/components/modals/error/ErrorNotAbleToAssign'
// Utils
import { serializeFormData } from '~/utils/helpers';

interface Props {}

const LoginPage: React.FC<Props> = observer(({}) => {
  const store: RootStore = useStore()
  const regionId = store.regionStore.currentRegion ? store.regionStore.currentRegion.id : null
  const isRegionPopupVisible = store.popupStore.show
  const currentRegionName = store.regionStore.currentRegion ? store.regionStore.currentRegion.name : ''
  const currentCityName = store.regionStore.currentCityName ? store.regionStore.currentCityName : ''
  const cityRegion = `${currentCityName} (${currentRegionName})`

  const { isMobileView } = useIsMobileView()
  // eslint-disable-next-line
  const navigate = useNavigate()

  
  const login = (payload: INewPatientForm, onSubmitCallback: () => void) =>  {
    if (regionId) {
      // eslint-disable-next-line
      const extendedFormData = serializeFormData<INewPatientForm, INewPatientPayload>(payload,
        (initialFormData) => {
          delete initialFormData.personal
          return {
            ...initialFormData,
            id_gender: +payload.id_gender as Sex,
            id_region: regionId
          }
        }
      )
      
      store.patientStore.createPatient(extendedFormData)
        .then((data) => {
          if (data && data.response && !store.egisErrorStore.isEgisError) {
            store.patientStore.setCurrentPatient({
              ...payload,
              idUserData: data.response.idUserData,
            })
            navigate('/appointment/hospital', { replace: true })
          }
        })
        .catch(e => console.log(e))
        .finally(onSubmitCallback)
    }
  }

  const handleClose = useCallback(() => {
    store.egisErrorStore.setIsEgisErrorRelatedToAssign(false)
  }, [store.egisErrorStore])

  return (
    <Wrapper>
      <div className={s.loginContainer}>
        <Heading type='h1'>Авторизация пациента</Heading>
        <Box sx={{
          position: 'relative',
        }} mt={isMobileView ? 5 : 14} mb={isMobileView ? 14 : 23}>
          <Typography variant='subtitle1'>Запись в государственные и частные больницы возможна после проверки данных пациента </Typography>
          {
            isMobileView && currentCityName && currentRegionName &&
              <LocationChangerPopUp
                open={isRegionPopupVisible}
                cityRegionName={cityRegion}
                onClose={() => store.popupStore.setShow(false)}
              />
          }
        </Box>
        <div className={s.loginForm}>
          <div className={s.loginFormItself}>
            <LoginForm 
              regionId={regionId}
              loginCallback={login}
            />
          </div>
          <div className={s.loginFormInformation}>
            <LoginPayAttentionBlock />
          </div>
        </div>
      </div>
      <ErrorNotAbleToAssign
        isError={store.egisErrorStore.isEgisErrorRelatedToAssign}
        onClose={handleClose}
      />
    </Wrapper>
  )
})

export default LoginPage 