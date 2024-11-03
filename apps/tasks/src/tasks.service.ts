import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}
  async find() {
    return this.tasksRepository.find({});
  }
  async create(createTaskDto: CreateTaskDto) {
    return this.authService.send('create_task', createTaskDto).pipe(
      map((res) => {
        console.log('res', res);
        return this.tasksRepository.create(createTaskDto);
      }),
    );
  }
}
