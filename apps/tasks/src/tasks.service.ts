import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from '@app/common';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    // @Inject(TASK_PROCESSOR_SERVICE)
    // private readonly taskProcessorService: ClientProxy,
  ) {}
  async find() {
    return this.tasksRepository.find({});
  }
  async create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.create(createTaskDto);
  }
}
