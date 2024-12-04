import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, TaskDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksRepository extends AbstractRepository<TaskDocument> {
  protected readonly logger = new Logger(TasksRepository.name);

  constructor(@InjectModel(TaskDocument.name) taskModel: Model<TaskDocument>) {
    super(taskModel);
  }
}
