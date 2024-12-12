import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  DatabaseModule,
  QUESTION_PROCESSOR_SERVICE,
  StudentAnswerDocument,
  StudentAnswerSchema,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentAnswerService } from './answers.service';
import { StudentAnswersRepository } from './answers.repository';
import { StudentAnswerController } from './answers.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: StudentAnswerDocument.name, schema: StudentAnswerSchema },
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
    ]),
  ],
  controllers: [StudentAnswerController],
  providers: [StudentAnswerService, StudentAnswersRepository],
})
export class QuestionsModule {}
