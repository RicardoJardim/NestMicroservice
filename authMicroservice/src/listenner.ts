import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000,
      },
    },
  );
  app.listen(() => console.log('Cat Microservice is listening'));
}
bootstrap();
