import type { Order } from '@/model/order.model'
import { httpClient } from '../config/config'

export class OrderRest {
  createOrder(data: Order) {
    const path = '/orders/checkout'
    return httpClient.post(path, data)
  }
}
