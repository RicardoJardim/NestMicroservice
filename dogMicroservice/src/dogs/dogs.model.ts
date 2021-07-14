export class Dog {
  id: number;
  title: string;
  description: string;
  size: number;
  price: number;

  constructor(
    id: number,
    title: string,
    description: string,
    size: number,
    price: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.size = size;
    this.price = price;
  }
}
