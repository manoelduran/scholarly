import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  DatabaseModule,
  NOTIFICATION_SERVICE,
  QUESTION_PROCESSOR_SERVICE,
  QuestionDocument,
  QuestionSchema,
  StudentAnswerDocument,
  StudentAnswerSchema,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentAnswerService } from './answers.service';
import { StudentAnswersRepository } from './answers.repository';
import { StudentAnswerController } from './answers.controller';
import { QuestionsModule } from '../questions/questions.module';
import { QuestionsRepository } from '../questions/questions.repository';

@Module({
  imports: [
    DatabaseModule,
    QuestionsModule,
    DatabaseModule.forFeature([
      { name: StudentAnswerDocument.name, schema: StudentAnswerSchema },
      { name: QuestionDocument.name, schema: QuestionSchema },
    ]),
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
  controllers: [StudentAnswerController],
  providers: [
    StudentAnswerService,
    StudentAnswersRepository,
    QuestionsRepository,
  ],
})
export class AnswersModule {}
