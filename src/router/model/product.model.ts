export type ProductImage = {
  url: string
  isMain?: boolean
}

export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public discount: number,
    public imageUrl: string = `https://picsum.photos/seed/${id}/400/240`,
    public images: ProductImage[] = [],
  ) {}

  get image() {
    return this.imageUrl
  }

  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      this.price * (1 - this.discount),
    )
  }
}
