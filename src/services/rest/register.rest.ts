import { HttpClient } from '../config/config'

export class RegisterRest {
  constructor(private httpClient: HttpClient = new HttpClient()) {}

  async register(body: { name: string; email: string; password: string }): Promise<any> {
    const url = '/auth/register'
    return this.httpClient.post(url, body)
  }
}
