import { httpClient } from '../config/config'
import { Product, type ProductImage } from '@/router/model/product.model'

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

type ProductListResponseCompat = Product[] & {
  data: {
    data: Product[]
  }
}

export class ProductRest {
  async getAll(params?: Record<string, unknown>): Promise<ProductListResponseCompat> {
    const path = '/products'
    const response = await httpClient.get<unknown>(path, params)
    const items = this.extractItems(response)

    const mapped = items.map((item) => {
      const id = String(item.id ?? '')
      const title = item.title ?? item.name ?? ''
      const description = item.description ?? item.shortDescription ?? ''
      const price = Number(item.price ?? item.offerPrice ?? 0)
      const discount = Number(item.discount ?? 0)
      const imagesFromApi: ProductImage[] = (item.images ?? []).reduce<ProductImage[]>(
        (acc, image, index) => {
          const url = image.url ?? image.secureUrl
          if (!url) return acc
          acc.push({ url, isMain: image.isMain ?? index === 0 })
          return acc
        },
        [],
      )

      const imageUrl = item.imageUrl ?? imagesFromApi[0]?.url

      if (imageUrl) {
        return new Product(id, title, description, price, discount, imageUrl, imagesFromApi)
      }

      return new Product(id, title, description, price, discount)
    })

    const compat = mapped as ProductListResponseCompat
    compat.data = { data: mapped }
    return compat
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
