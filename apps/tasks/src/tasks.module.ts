import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuestionsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
