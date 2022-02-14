import Cookies from 'js-cookie'

export const authTokenName = process.env.API_TOKEN_KEY || 'auth-token' // placeholder

export function getToken() {
  return Cookies.get(authTokenName)
}

export const baseURL = process.env.BACKEND_API_ENDPOINT_URL || 'https://some-base/api' // placeholder