import { httpClient } from '../config/config'
import type { RegisterModel } from '@/model/register.model'

export class RegisterRest {
  registerUser(body: RegisterModel): Promise<unknown> {
    const path = '/register'
    return httpClient.post(path, body)
  }
}
