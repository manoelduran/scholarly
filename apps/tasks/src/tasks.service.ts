import { Inject, Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { ClientProxy } from '@nestjs/microservices';
import { TASK_PROCESSOR_SERVICE } from '@app/common';
import { map } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    @Inject(TASK_PROCESSOR_SERVICE)
    private readonly taskProcessorService: ClientProxy,
  ) {}
  async find() {
    return this.tasksRepository.find({});
  }
  async create(createTaskDto: CreateTaskDto) {
    return this.taskProcessorService.send('create_task', createTaskDto).pipe(
      map((res) => {
        console.log('Response from task-processor', res);
        return this.tasksRepository.create(createTaskDto);
      }),
    );
  }
}
