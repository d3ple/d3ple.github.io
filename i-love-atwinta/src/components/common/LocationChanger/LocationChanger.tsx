import React from 'react'
import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite';

import s from '~/components/common/LocationChanger/LocationChanger.module.scss'
import LocationChangerPopUp from '~/components/popups/LocationChangerPopUp';
import useIsMobileView from '~/hooks/useIsMobile';
import { useStore } from '~/hooks/useStore';
import RootStore from '~/store/modules/RootStore';

interface Props {}

const LocationChanger: React.FC<Props> = observer(({}) => {
  const store: RootStore = useStore()
  const visible = store.popupStore.show
  const currentRegionName = store.regionStore.currentRegion ? store.regionStore.currentRegion.name : ''
  const currentCityName = store.regionStore.currentCityName ? store.regionStore.currentCityName : ''
  const cityRegion = `${currentCityName} (${currentRegionName})`
  const { isMobileView } = useIsMobileView()

  const handleClick = () => {
    store.popupStore.setShow(!store.popupStore.show)
  };

  const handleClose = () => {
    localStorage.setItem('currentRegion', JSON.stringify(store.regionStore.currentRegion))
    store.regionStore.setCachedRegion(JSON.stringify(store.regionStore.currentRegion))
    store.popupStore.setShow(false)
  };

  return (
    <div className={s.locationChanger}>
      {
        currentRegionName && currentCityName ? <>
          <svg onClick={() => handleClick()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.8031 10.3201C14.8031 8.77308 13.5496 7.51953 12.0037 7.51953C10.4567 7.51953 9.20312 8.77308 9.20312 10.3201C9.20312 11.866 10.4567 13.1195 12.0037 13.1195C13.5496 13.1195 14.8031 11.866 14.8031 10.3201Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.001 22.0799C10.6587 22.0799 3.60156 16.3661 3.60156 10.3908C3.60156 5.71295 7.36152 1.91992 12.001 1.91992C16.6405 1.91992 20.4016 5.71295 20.4016 10.3908C20.4016 16.3661 13.3433 22.0799 12.001 22.0799Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Typography onClick={() => handleClick()} variant="body2" className={s.locationChangerTitle}>
            { cityRegion }
          </Typography>

          { !isMobileView &&
            <LocationChangerPopUp
              cityRegionName={cityRegion}
              open={visible}
              onClose={handleClose}
            />
          }
        </>
        : null
      }
    </div>
  )
})

export default LocationChanger
