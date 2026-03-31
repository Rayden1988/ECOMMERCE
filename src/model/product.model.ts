import { Image } from './image.model';

export class Product {
  // categoryId: 'f394825c-0264-495f-84f3-3a7dcce75f89'
  // compareAtPrice: 1199.99
  // createdAt: '2026-03-15T18:13:51.337Z'
  // description: 'Latest Apple smartphone with titanium design'
  // id: 'ddabf0bb-5417-40cd-b059-1fbdb63fb85c'
  // images: []
  // isActive: true
  // name: 'iPhone 16 Pro'
  // price: 999.99
  // sku: 'IPH-16-PRO-256'
  // slug: 'iphone-16-pro'
  // stock: 50
  // stripePriceId: null
  // stripeProductId: null
  // updatedAt: '2026-03-15T18:13:51.337Z'

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public discount: number = 0,
    public sku: string = '',
    public slug: string = '',
    public stock: number = 0,
    public stripePriceId: string | null = null,
    public stripeProductId: string | null = null,
    public updatedAt: string = '',
    public images: Image[] = [],


  ) {}

  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.price)
  }
}
