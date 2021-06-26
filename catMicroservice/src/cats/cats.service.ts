import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cats.model';
@Injectable()
export class CatService {
  private id: number = 0;
  private cats: Cat[] = [];

  async getAllCats(): Promise<any> {
    return await [...this.cats];
  }

  async getQueryCat(id: number): Promise<any> {
    let cat = this.findCat(id)[0];
    if (!cat) {
      return await new NotFoundException();
    }
    return await { ...cat };
  }

  insertCats(title: string, desc: string, price: number) {
    this.id++;
    const newCat = new Cat(this.id, title, desc, price);
    this.cats.push(newCat);
    return this.id;
  }
  getSingleCat(catId: number) {
    let cat = this.findCat(catId)[0];
    if (!cat) {
      return new NotFoundException();
    }
    return { ...cat };
  }

  updateCat(catId: number, title: string, desc: string, price: number) {
    let [cat, index] = this.findCat(catId);
    let updated = { ...cat };
    if (title) {
      updated.title = title;
    }
    if (desc) {
      updated.description = desc;
    }
    if (price) {
      updated.price = price;
    }
    this.cats[index] = updated;
  }

  deleteCat(catId: number) {
    let index = this.findCat(catId)[1];
    this.cats.splice(index, 1);
  }

  private findCat(catId: number): [Cat, number] {
    let catIndex = this.cats.findIndex((el) => el.id == catId);
    let cat = this.cats[catIndex];
    return [cat, catIndex];
  }
}
