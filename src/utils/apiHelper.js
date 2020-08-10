import axios from 'axios'

import { API_URL } from '../config'

axios.defaults.baseURL = API_URL

export async function request (options) {
  const data = options.data || options.body
  delete options.body
  const config = {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    ...options,
    data
  }
  return axios.request(config).then(response => {
    return response ? response.data : null
  })
}

export function doRequest (options) {
  return request(options)
}
