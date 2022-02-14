import axios from 'axios'

import { baseURL, getToken } from '~/utils/services/config'
// import SystemModule from '~/store/modules/SystemModule'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const camelCaseKeys = require('camelcase-keys')
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const snakeCaseKeys = require('snakecase-keys')

const api = axios.create()

api.interceptors.request.use(
  config => {
    // В params запросов, для которых не нужно показывать спиннер, надо подкладывать loading: false
    // Если этого поля нет, то спиннер показывается
    // if (config.params && config.params.loading === undefined) {
    //   // SystemModule.loadingStart()
    // }

    if (process.env.NODE_ENV === 'production') {
      config.withCredentials = true
    } else {
      const authToken = getToken()

      if (authToken) {
        if (config.headers) {
          config.headers[`${process.env.API_TOKEN_KEY}`] = `${authToken}`
        }
      }
    }
    
    // if (config.data) {
    //   config.data = snakeCaseKeys(config.data) // 
    // }

    config.baseURL = baseURL

    return config
  },
  reason => {
    // SystemModule.loadingEnd()
    return Promise.reject(reason)
  },
)

api.interceptors.response.use(
  response => {
    if (response.data) {
      response.data = camelCaseKeys(response.data, { deep: true })
    }

    // SystemModule.loadingEnd()

    return response
  },
  reason => {
    // SystemModule.loadingEnd()
    return Promise.reject(reason)
  },
)

export default api
