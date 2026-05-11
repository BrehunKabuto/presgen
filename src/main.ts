import 'dotenv/config'
import {NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import  cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  ) 
  app.use(cookieParser())

  app.enableCors({
    origin: [process.env.FRONTEND_URL!],
    methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
