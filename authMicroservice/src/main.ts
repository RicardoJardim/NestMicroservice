import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000,
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3001, () => console.log('Auth Service is listening'));
}
bootstrap();
