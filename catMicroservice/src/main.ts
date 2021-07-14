import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4001,
      },
    },
  );

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.listen(() => console.log('Cat Microservice is listening'));
}
bootstrap();
