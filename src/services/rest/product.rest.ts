import { httpClient } from '../config/config'
import type { Product } from '@/router/model/product.model'

type ProductApiItem = {
  id?: string | number
  title?: string
  name?: string
  description?: string
  shortDescription?: string
  price?: number | string
  offerPrice?: number | string
  compareAtPrice?: number | string
  discount?: number | string
  imageUrl?: string
  images?: Array<{ url?: string; secureUrl?: string; isMain?: boolean }>
}

type ProductListResponseCompat = {
  success: true
  message: string
  data: {
    data: Product[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export class ProductRest {
  async getAll(params?: Record<string, unknown>): Promise<ProductListResponseCompat> {
    const path = '/products'
    const response = await httpClient.get(path, params)

    return response as ProductListResponseCompat
  }

  private extractItems(payload: unknown): ProductApiItem[] {
    if (Array.isArray(payload)) {
      return payload as ProductApiItem[]
    }

    if (payload && typeof payload === 'object') {
      const rootItems = (payload as { items?: unknown }).items
      if (Array.isArray(rootItems)) {
        return rootItems as ProductApiItem[]
      }

      const data = (payload as { data?: unknown }).data

      if (Array.isArray(data)) {
        return data as ProductApiItem[]
      }

      if (data && typeof data === 'object') {
        const dataItems = (data as { items?: unknown }).items
        if (Array.isArray(dataItems)) {
          return dataItems as ProductApiItem[]
        }

        const nestedData = (data as { data?: unknown }).data
        if (Array.isArray(nestedData)) {
          return nestedData as ProductApiItem[]
        }

        if (nestedData && typeof nestedData === 'object') {
          const nestedItems = (nestedData as { items?: unknown }).items
          if (Array.isArray(nestedItems)) {
            return nestedItems as ProductApiItem[]
          }
        }
      }
    }

    return []
  }
}
