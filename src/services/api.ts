import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/'
})

api.interceptors.response.use(response => response, error => {
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message, error.response.status))
  } else {
    return Promise.reject(error)
  }
})

export {
  api
}
