import type { Product } from './product.model'

export interface ICartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(
    public list: ICartItem[] = [],
    public totalPrice: number = 0,
  ) {}

  get total() {
    return this.totalPrice
  }

  set total(value: number) {
    this.totalPrice = value
  }

  addItem(product: Product) {
    if (this.productAlreadyExists(product)) {
      this.list = this.list.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    } else {
      this.list.push({ product, quantity: 1 })
    }

    this.totalPrice += product.price * (1 - product.discount)
  }

  removeItem(product: Product) {
    if (!this.productAlreadyExists(product)) return

    const itemQuantity = this.list.find((item) => item.product.id === product.id)?.quantity

    this.list = this.list.filter((item) => item.product.id !== product.id)
    this.totalPrice -= product.price * (1 - product.discount) * (itemQuantity ? itemQuantity : 0)
  }

  decrementItem(product: Product) {
    if (!this.productAlreadyExists(product)) return

    if (this.list.find((item) => item.product.id === product.id)?.quantity === 1) {
      this.removeItem(product)
      return
    }

    this.list = this.list.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
    )

    this.totalPrice -= product.price * (1 - product.discount)
  }

  productAlreadyExists(product: Product) {
    return this.list.some((item) => item.product.id === product.id)
  }

  getTotalPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      this.totalPrice,
    )
  }
}
