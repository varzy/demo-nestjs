import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_CONFIG } from './config/app.config';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Usages
  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe({ transform: true }));

  // Class Validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(APP_CONFIG.projectName)
    .setDescription(APP_CONFIG.projectDescription)
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(APP_CONFIG.serverPort);
}
bootstrap();
