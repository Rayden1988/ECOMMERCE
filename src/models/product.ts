export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public discount = 0,
    public category = 'Instrumentos',
  ) {}

  get finalPrice() {
    return Number((this.price * (1 - this.discount)).toFixed(2))
  }

  get savings() {
    return Number((this.price - this.finalPrice).toFixed(2))
  }
}
