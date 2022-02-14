import { makeAutoObservable } from 'mobx'

import { ICityBrief, IRegionBrief, IRegionWithGeo } from '~/store/types/regions'
import { fetchRegionsCitiesService, fetchRegionsGeoDataService, fetchRegionsService } from '~/services/regions'
import { IYandexGeolocation } from '~/store/types/vendor/yandex-geolocation'
import axios from 'axios'
// Note: https://stackoverflow.com/questions/58919016/babel-and-webpack-are-throwing-cant-resolve-regenerator-runtime-runtime
import 'regenerator-runtime/runtime'
import RootStore from '~/store/modules/RootStore'

/**
 * Note: Класс предназначенный для работы с регионами
 * - Attention: текущий город получается через Yandex api
 */

class Region {
  rootStore!: RootStore

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this);
    if (rootStore) {
      this.rootStore = rootStore;
    }
  }

  // ---------------------------- Regions data ---------------------------- >>
  cachedRegion = localStorage.getItem('currentRegion')
  regions: IRegionBrief[] = []
  citiesInRegion: ICityBrief[] = []
  regionsWithGeo: IRegionWithGeo[] = []
  currentCityName = ''
  postcode: string | null = null
  latitude = ''
  longitude = ''

  setCachedRegion(payload: string) {
    this.cachedRegion = payload
  }

  setRegions(regions: IRegionBrief[]) {
    this.regions = regions
  }

  setUserPostcode(postcode: string | null) {
    this.postcode = postcode
  }

  setCities(cities: ICityBrief[]) {
    this.citiesInRegion = [...cities]
  }

  setLatitude(payload: string) {
    this.latitude = payload
  }

  setLongitude(payload: string) {
    this.longitude = payload
  }

  setRegionsWithGeo(payload: IRegionWithGeo[]) {
    this.regionsWithGeo = payload
  }

  setCurrentCityName(name: string) {
    this.currentCityName = name
  }

  get currentRegion(): IRegionWithGeo | null {
    const _currentRegion = this.regionsWithGeo.find(item => {
      return item.isGeo === 1
    })

    if (_currentRegion) {
      if (this.cachedRegion) {
        if (_currentRegion.id !== JSON.parse(this.cachedRegion).id as number) {
          this.rootStore.popupStore.setShow(true)
          return _currentRegion
        } else {
          this.setCachedRegion(JSON.stringify(_currentRegion))
          return _currentRegion
        }
      } else {
        this.rootStore.popupStore.setShow(true)
        return _currentRegion
      }
    }
    return null
  }

  fetchRegions() {
    this.rootStore.systemStore.loadingStart()
    fetchRegionsService()
      .then(({ data }) => {
        this.setRegions(data.response)
      })
      .finally(() => this.rootStore.systemStore.loadingEnd())
  }

  fetchCurrentRegionCities() {
    if (this.currentRegion) {
      this.rootStore.systemStore.loadingStart()
      fetchRegionsCitiesService(this.currentRegion.id)
        .then(({ data }) => {
          this.setCities(data.response)
        })
        .catch(err => console.log(err))
        .finally(() => this.rootStore.systemStore.loadingEnd())
    }
  }

  getGeolocation() {
    const { geolocation } = navigator
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
  
    geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { coords: { latitude, longitude} } = position;
        this.setLongitude(longitude.toString());
        this.setLatitude(latitude.toString());
      },
      (positionError: GeolocationPositionError) => {
        console.log(positionError)
      },
      options
    )
  }

  async fetchGeolocation() {
    try {
      this.rootStore.systemStore.loadingStart()
      const { data } = await axios.get<IYandexGeolocation>(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.YANDEX_GEOCODER_API_KEY}&geocode=${this.longitude},${this.latitude}&lang=ru_RU&kind=house`)
      let postcode = '', cityName = ''
      if (data.response.GeoObjectCollection.featureMember) {
        postcode = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.postal_code
        const tempValueCity = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.find(item => item.kind === 'locality')
        if (tempValueCity) {
          cityName = tempValueCity.name
        } else {
          cityName = 'Кемерово.' // backdoor
        }
        this.setUserPostcode(postcode)
        this.setCurrentCityName(cityName)
      }
      
      this.rootStore.systemStore.loadingEnd()
      return postcode

    } catch {
      
      this.rootStore.systemStore.loadingEnd()
      return null
    }
  }

  fetchRegionsWithGeo(postcode: string) {
    return fetchRegionsGeoDataService({ postalCode: postcode })
      .then(({ data }) => {
        this.setRegionsWithGeo(data.response)
      })
      .catch(err => console.log(err))
  }
}

export default Region