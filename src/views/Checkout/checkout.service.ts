import type { ICartItem } from '@/model/cart.model'
import type { Order } from '@/model/order.model'
import { OrderRest } from '@/services/rest/order.rest'

export class CheckoutService {
  constructor(private orderRest: OrderRest = new OrderRest()) {}

  createOrder(order: Order): Promise<any> {
    return this.orderRest.createOrder(order)
  }
}
