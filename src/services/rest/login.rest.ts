import { HttpClient } from '../config/config'

export class LoginRest {
  constructor(private httpClient: HttpClient = new HttpClient()) {}

  async login(body: { email: string; password: string }): Promise<any> {
    const url = '/auth/login'
    return this.httpClient.post(url, body)
  }
}
