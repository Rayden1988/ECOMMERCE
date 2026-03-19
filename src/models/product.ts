export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public discount = 0,
    public category = 'Instrumentos',
    public id: string = Math.random().toString(36).slice(2),
    public imageUrl: string = `https://picsum.photos/seed/${id}/400/240`,
  ) {}

  get finalPrice() {
    return Number((this.price * (1 - this.discount)).toFixed(2))
  }

  get savings() {
    return Number((this.price - this.finalPrice).toFixed(2))
  }

  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      this.finalPrice,
    )
  }
}
