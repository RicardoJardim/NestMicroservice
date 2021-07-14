import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [HttpModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
