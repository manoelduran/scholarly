import { Module } from '@nestjs/common';
import { TaskProcessorController } from './task-processor.controller';
import { TaskProcessorService } from './task-processor.service';
import { LoggerModule } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

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
    LoggerModule,
  ],
  controllers: [TaskProcessorController],
  providers: [TaskProcessorService],
})
export class TaskProcessorModule {}
