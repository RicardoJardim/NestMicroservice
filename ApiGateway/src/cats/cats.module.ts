import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'CAT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService, AuthGuard],
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
