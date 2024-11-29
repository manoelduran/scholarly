import { Module } from '@nestjs/common';
import { TaskProcessorController } from './task-processor.controller';
import { TaskProcessorService } from './task-processor.service';
import { AUTH_SERVICE, DatabaseModule, TASKS_SERVICE } from '@app/common';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TaskProcessorDocument,
  TaskProcessorSchema,
} from './models/task-processor.model';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: TaskProcessorDocument.name, schema: TaskProcessorSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth_queue',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: TASKS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'task_queue',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TaskProcessorController],
  providers: [TaskProcessorService],
})
export class TaskProcessorModule {}
