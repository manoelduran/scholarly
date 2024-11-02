import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      noAck: false,
      queue: 'tasks_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(configService.get('PORT'));
}
bootstrap();
