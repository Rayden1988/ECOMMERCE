export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public discount: number,
    public id: string = Math.random().toString(36).slice(2),
    public imageUrl: string = `https://picsum.photos/seed/${id}/400/240`,
  ) {}

  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      this.price * (1 - this.discount),
    )
  }
}
