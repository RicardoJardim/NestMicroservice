import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'DOG_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4002,
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
  controllers: [DogsController],
  providers: [DogsService, AuthGuard],
})
export class DogsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'api/dogs', method: RequestMethod.GET },
        { path: 'api/dogs/:id', method: RequestMethod.GET },
      );
  }
}
