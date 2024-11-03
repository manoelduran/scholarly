import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_SERVICE, DatabaseModule } from '@app/common';
import { TaskDocument, TaskSchema } from './models/task.model';
import { QuestionDocument, QuestionSchema } from './models/question.model';
import { QuestionsModule } from './questions/questions.module';
import { TasksRepository } from './tasks.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    QuestionsModule,
    DatabaseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
      { name: QuestionDocument.name, schema: QuestionSchema },
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
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
