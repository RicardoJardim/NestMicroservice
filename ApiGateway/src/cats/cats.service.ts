import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}
  async getAllCats(): Promise<any> {
    return await this.clientProxy
      .send({ cmd: 'cat', role: 'getAllCats' }, '')
      .pipe(timeout(5000))
      .toPromise();
  }

  async getQueryCat(id: number): Promise<any> {
    return await this.clientProxy
      .send({ cmd: 'cat', role: 'getOneCat' }, id)
      .pipe(timeout(5000))
      .toPromise();
  }

  async insertCat(body: {}) {
    return await this.clientProxy
      .send({ cmd: 'cat', role: 'createCat' }, body)
      .pipe(timeout(5000))
      .toPromise();
  }

  async updateCat(catId: number, body: {}) {
    return await this.clientProxy
      .send({ cmd: 'cat', role: 'changeCat' }, { id: catId, body: body })
      .pipe(timeout(5000))
      .toPromise();
  }

  async deleteCat(catId: number) {
    return await this.clientProxy
      .send({ cmd: 'cat', role: 'deleteCat' }, catId)
      .pipe(timeout(5000))
      .toPromise();
  }
}
