import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import { TaskDocument, TaskSchema } from './models/task.model';
import { QuestionDocument, QuestionSchema } from './models/question.model';
import { QuestionsModule } from './questions/questions.module';

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
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
