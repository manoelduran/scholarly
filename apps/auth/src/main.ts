import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      noAck: false,
      queue: 'auth_queue',
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
