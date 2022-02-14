import React, { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom"
import { observer } from 'mobx-react-lite'

// Pages
import LoginPage from '~/views/login/LoginPage'
import RootAppointmentPage from '~/views/appointment/RootAppointmentPage'
import NotFoundPage from '~/views/not-found/NotFoundPage'
// Components
import Header from '~/components/layouts/header/Header'
import Wrapper from '~/components/layouts/wrapper/Wrapper'
import Breadcrumbs from '~/components/common/Breadcrumbs/Breadcrumbs'
import Footer from '~/components/layouts/footer/Footer'
import Preloader from '~/components/common/Preloader/Preloader'
import MobileMenu, { MobileMenuAdditional } from '~/components/layouts/mobile-menu/MobileMenu'
import GlobalErrorModal from '~/components/modals/error/GlobalErrorModal'
// Styles
import s from '~/App.module.scss'
// Types
import RootStore from './store/modules/RootStore'
// Routing
import RouterAuthorized from '~/router/RouterAuthorized'
// Hooks
import useBreadcrumbs from '~/hooks/useBreadcrumbs'
import { useStore } from '~/hooks/useStore'
import useIsMobileView from './hooks/useIsMobile'

const App: React.FC = observer(() => {
  const location = useBreadcrumbs()
  const store: RootStore = useStore()
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState<boolean>(false)
  const { isMobileView } = useIsMobileView()
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  // ========================================Effects-START=======================================
  useEffect(() => {
    if (!isMobileView) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobileView])

  useEffect(() => {
    if (searchParams.get('post_code')) {
      store.regionStore.setUserPostcode(searchParams.get('post_code'))
    } else {
      store.regionStore.getGeolocation()
    }
  }, [store.regionStore, searchParams])

  useEffect(() => {
    if (store.regionStore.latitude && store.regionStore.longitude) {
      store.regionStore.fetchGeolocation()
        .then((postcode) => {
          if (postcode) {
            store.regionStore.fetchRegionsWithGeo(postcode)
              .then(() => {
                store.regionStore.fetchCurrentRegionCities()
              })
          }
        })
    } else if (store.regionStore.postcode) {
      store.regionStore.fetchRegionsWithGeo(store.regionStore.postcode)
        .then(() => {
          store.regionStore.fetchCurrentRegionCities()
        })
    }
  }, [
    store.regionStore,
    store.regionStore.latitude,
    store.regionStore.longitude,
    searchParams
  ])
  // ========================================Effects-END=======================================

  // Note: Для реализации динамических импортов можно настроить Webpack следующим образом
  // See: https://www.skovy.dev/blog/code-splitting-with-webpack-typescript-react?seed=d86ge3
  return <div className={isMobileMenuOpen ? s.applicationFixed : ''}>
    <Header />
    <div className={s.application}>
      <main className={s.applicationContainer}>
        {location &&
          <Wrapper>
            <div className={s.layoutBreadcrumbs}>
              <Breadcrumbs to={location.to} text={location.title} external={location.external} />
            </div>
          </Wrapper>
        }
        <Routes>
          <Route path="/new-patient" element={<LoginPage />} />
          <Route
            path="/appointment/*"
            element={
              <RouterAuthorized>
                <RootAppointmentPage />
              </RouterAuthorized>
            }
          />

          <Route path='/' element={<Navigate to='/new-patient' />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileMenu handlerOpenMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}/>
      <MobileMenuAdditional
        isMobileViewOpened={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Preloader />
      <GlobalErrorModal
        isOpened={store.egisErrorStore.isEgisError}
      />
    </div>
  </div>
})

export default App;