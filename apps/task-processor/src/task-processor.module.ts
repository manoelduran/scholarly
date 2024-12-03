import { Module } from '@nestjs/common';
import { TaskProcessorController } from './task-processor.controller';
import { TaskProcessorService } from './task-processor.service';
import { LoggerModule, TASKS_SERVICE } from '@app/common';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        OLLAMA_HOST: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([

      {
        name: TASKS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'task_processor',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    LoggerModule,
  ],

  controllers: [TaskProcessorController],
  providers: [TaskProcessorService],
})
export class TaskProcessorModule {}
