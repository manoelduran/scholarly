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
import { QuestionsModule } from './questions/questions.module';
import { TasksRepository } from './tasks.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsRepository } from './questions/questions.repository';
import { StudentAnswersRepository } from './answers/answers.repository';
import { StudentAnswerService } from './answers/answers.service';
import { StudentAnswerController } from './answers/answers.controller';

@Module({
  imports: [
    DatabaseModule,
    QuestionsModule,
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
  controllers: [TasksController, QuestionsController, StudentAnswerController],
  providers: [
    TasksService,
    TasksRepository,
    QuestionsService,
    QuestionsRepository,
    StudentAnswersRepository,
    StudentAnswerService,
  ],
})
export class TasksModule {}
