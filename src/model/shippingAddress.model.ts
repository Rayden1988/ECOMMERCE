export class ShippingAddress {
  constructor(
    public city: string = '',
    public street: string = '',
    public complement: string = '',
    public country: string = '',
    public neighborhood: string = '',
    public number: string = '',
    public state: string = '',
    public zipCode: string = '',
  ) {}
}
