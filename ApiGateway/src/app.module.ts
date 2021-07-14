import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMainMiddleware } from './middlewares/loggerMain.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [DogsModule, CatsModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMainMiddleware).forRoutes(AppController);
  }
}
