import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.12:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject('Erro no Servidor, tente novamente mais tarde.')
    }
  }
)

export { api }
