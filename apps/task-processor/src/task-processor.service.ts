import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'apps/tasks/src/dto/create-task.dto';

@Injectable()
export class TaskProcessorService {
  async generateTask(data: CreateTaskDto) {
    console.log('Processing task:', data);
    return 'hello';
  }
}
