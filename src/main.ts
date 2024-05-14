import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')); // implementar logger http

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verificar que se envie el body correctp de acuerdo al dt
      forbidNonWhitelisted: true, // tirar error al cliente si intenta mandar otra cosa en el body
      transform: true, // transforem automaticamente los datos siempre que pueda (Params)
    }),
  );

  await app.listen(3000);
}
bootstrap();
