import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser:false,
  });

   app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const allowedOrigins = [
    "https://localhost:3000"
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  
  app.setGlobalPrefix('/api/v1');

  await app.listen(process.env.PORT ?? 2000);
}
bootstrap();
