import { Module } from '@nestjs/common';
import { LoggerModule, TASKS_SERVICE } from '@app/common';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionProcessorController } from './question-processor.controller';
import { QuestionProcessorService } from './question-processor.service';

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
            queue: 'question_processor',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    LoggerModule,
  ],

  controllers: [QuestionProcessorController],
  providers: [QuestionProcessorService],
})
export class QuestionProcessorModule {}
