
import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from "@/stores/auth";
export class AxiosConfig {
  private $instance: AxiosInstance

  constructor(public baseURL: string = '/api') {
    this.$instance = axios.create({
      baseURL: this.baseURL,
    })
  }

  setConfig() {
    this.$instance.interceptors.request.use((config) => {
      const token = useAuthStore().accessToken
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.$instance.interceptors.response.use((res) => {
      return res
    })

    return this.$instance
  }
}

export const api = new AxiosConfig().setConfig()
