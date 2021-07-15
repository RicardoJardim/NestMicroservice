import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class DogsService {
  constructor(
    @Inject('DOG_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  async getAllDogs(): Promise<any> {
    return await this.clientProxy
      .send({ cmd: 'dog', role: 'getAllDogs' }, '')
      .pipe(
        timeout(5000),
        catchError((err) => of(err)),
      )
      .toPromise();
  }

  async getQueryDog(id: number): Promise<any> {
    return await this.clientProxy
      .send({ cmd: 'dog', role: 'getOneDog' }, id)
      .pipe(
        timeout(5000),
        catchError((err) => of(err)),
      )
      .toPromise();
  }

  async insertDog(body: {}) {
    return await this.clientProxy
      .send({ cmd: 'dog', role: 'createDog' }, body)
      .pipe(
        timeout(5000),
        catchError((err) => of(err)),
      )
      .toPromise();
  }

  async updateDog(catId: number, body: {}) {
    return await this.clientProxy
      .send({ cmd: 'dog', role: 'changeDog' }, { id: catId, body: body })
      .pipe(
        timeout(5000),
        catchError((err) => of(err)),
      )
      .toPromise();
  }

  async deleteDog(catId: number) {
    return await this.clientProxy
      .send({ cmd: 'dog', role: 'deleteDog' }, catId)
      .pipe(
        timeout(5000),
        catchError((err) => of(err)),
      )
      .toPromise();
  }
}
