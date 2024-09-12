import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.16.81.90:3333',
})
