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

  async insertCats(title: string, desc: string, price: number): Promise<any> {
    this.id++;
    const newCat = new Cat(this.id, title, desc, price);
    this.cats.push(newCat);
    return await { ...newCat };
  }

  async updateCat(
    catId: number,
    title: string,
    desc: string,
    price: number,
  ): Promise<any> {
    let [cat, index] = this.findCat(catId);
    if (cat && index) {
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
      return await updated;
    } else {
      return await new NotFoundException();
    }
  }

  async deleteCat(catId: number) {
    let index = this.findCat(catId)[1];
    if (!index) {
      return await new NotFoundException();
    }
    this.cats.splice(index, 1);
    return {
      message: `The dog with the id ${catId} was deleted successfully`,
    };
  }

  private findCat(catId: number): [Cat, number] {
    let catIndex = this.cats.findIndex((el) => el.id == catId);
    let cat;
    catIndex != -1 ? (cat = this.cats[catIndex]) : (cat = null);
    return [cat, catIndex];
  }
}
