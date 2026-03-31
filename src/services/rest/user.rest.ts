import axios from 'axios'
import { apiConfig } from '../config'
import type { RegisterModel } from '@/model/register.model'

const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
})

export const userRest = {
  registerUser(body: RegisterModel) {
    return api.post('/register', body)
  },
}
