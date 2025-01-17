import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  NOTIFICATION_SERVICE,
  QUESTION_PROCESSOR_SERVICE,
  QuestionDocument,
  QuestionSchema,
  StudentAnswerDocument,
  StudentAnswerSchema,
  TaskDocument,
  TaskSchema,
} from '@app/common';
import { TasksRepository } from './tasks.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuestionsRepository } from './questions/questions.repository';
import { StudentAnswersRepository } from './answers/answers.repository';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    DatabaseModule,
    QuestionsModule,
    AnswersModule,
    DatabaseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
      { name: QuestionDocument.name, schema: QuestionSchema },
      { name: StudentAnswerDocument.name, schema: StudentAnswerSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
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
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: QUESTION_PROCESSOR_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'question_processor',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: NOTIFICATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'notification',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksRepository,
    QuestionsRepository,
    StudentAnswersRepository,
  ],
})
export class TasksModule {}
