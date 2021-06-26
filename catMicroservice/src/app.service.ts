import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getViewName(): [string, {}] {
    return ['index', { message: 'ola' }];
  }
}
