import { api } from '.'

interface IHttp {
  get<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    baseURL?: string,
  ): Promise<T>
  post<T = unknown>(path: string, body: unknown, baseURL?: string): Promise<T>
  put<T = unknown>(path: string, body: unknown, baseURL?: string): Promise<T>
  delete<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    baseURL?: string,
  ): Promise<T>
}

export class HttpClient implements IHttp {
  get<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    baseURL?: string,
  ): Promise<T> {
    return api.get<T>(path, { params, baseURL }).then((res) => res.data)
  }

  post<T = unknown>(path: string, body: unknown, baseURL?: string): Promise<T> {
    return api.post<T>(path, body, { baseURL }).then((res) => res.data)
  }

  put<T = unknown>(path: string, body: unknown, baseURL?: string): Promise<T> {
    return api.put<T>(path, body, { baseURL }).then((res) => res.data)
  }

  delete<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    baseURL?: string,
  ): Promise<T> {
    return api.delete<T>(path, { params, baseURL }).then((res) => res.data)
  }
}
export const httpClient = new HttpClient()
