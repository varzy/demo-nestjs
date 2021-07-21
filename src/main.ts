import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(APP_CONFIG.serverPort);
}
bootstrap();
