import axios from 'axios'

function createUrl(path: string): string {
  return `https://rickandmortyapi.com${path}`
}

export const API_URL = createUrl('/api') as string

const instance = axios.create({ baseURL: API_URL })
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response.data)
  }
)

export default instance
