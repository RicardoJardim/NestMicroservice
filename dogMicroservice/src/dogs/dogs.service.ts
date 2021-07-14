import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dogs.model';
@Injectable()
export class DogsService {
  private id: number = 0;
  private dog: Dog[] = [];

  async getAlldogs(): Promise<any> {
    return await [...this.dog];
  }

  async getQueryDog(id: number): Promise<any> {
    let dog = this.findDog(id)[0];
    if (!dog) {
      return await new NotFoundException();
    }
    return await { ...dog };
  }

  async insertDog(
    title: string,
    desc: string,
    size: number,
    price: number,
  ): Promise<any> {
    this.id++;
    const newDog = new Dog(this.id, title, desc, size, price);
    this.dog.push(newDog);
    return await { ...newDog };
  }

  async updateDog(
    id: number,
    title: string,
    desc: string,
    size: number,
    price: number,
  ): Promise<any> {
    let [dog, index] = this.findDog(id);
    if (dog && index) {
      let updated = { ...dog };
      if (title) {
        updated.title = title;
      }
      if (desc) {
        updated.description = desc;
      }
      if (size) {
        updated.size = size;
      }
      if (price) {
        updated.price = price;
      }
      this.dog[index] = updated;
      return await updated;
    } else {
      return await new NotFoundException();
    }
  }

  async deleteDog(id: number) {
    let index = this.findDog(id)[1];
    if (!index) {
      return await new NotFoundException();
    }
    this.dog.splice(index, 1);
    return await {
      message: `The dog with the id ${id} was deleted successfully`,
    };
  }

  private findDog(id: number): [Dog, number] {
    let dogIndex = this.dog.findIndex((el) => el.id == id);
    let dog;
    dogIndex != -1 ? (dog = this.dog[dogIndex]) : (dog = null);
    return [dog, dogIndex];
  }
}
