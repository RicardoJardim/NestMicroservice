import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
