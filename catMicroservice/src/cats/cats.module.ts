import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'api/cats', method: RequestMethod.GET },
        { path: 'api/cats/:id', method: RequestMethod.GET },
      );
  }
}
