import { api } from '../config'
import type { RegisterModel } from '@/model/register.model'

export const userRest = {
  registerUser(body: RegisterModel) {
    return api.post('/register', body)
  },
}
