import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev')); // implementar logger http

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verificar que se envie el body correctp de acuerdo al dt
      forbidNonWhitelisted: true, // tirar error al cliente si intenta mandar otra cosa en el body
      transform: true, // transforem automaticamente los datos siempre que pueda (Params)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Challenge API')
    .setDescription('The challengen API description.')
    .setVersion('1.0.0')
    .setContact(
      'González, Brian Leonel',
      'https://github.com/briansleonel',
      'gonzalezbrianleonel76@gmail.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
