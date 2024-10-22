import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from './models/task.model';

@Injectable()
export class TasksRepository extends AbstractRepository<TaskDocument> {
  protected readonly logger = new Logger(TasksRepository.name);

  constructor(@InjectModel(TaskDocument.name) taskModel: Model<TaskDocument>) {
    super(taskModel);
  }
}
