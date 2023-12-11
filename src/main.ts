import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';


async function bootstrap() {
  dotenvConfig({ path: '.env' });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards();
  const config = new DocumentBuilder()
    .setTitle('Test title')
    .setDescription('test description')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .setExternalDoc('Postman collection', '/api-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
