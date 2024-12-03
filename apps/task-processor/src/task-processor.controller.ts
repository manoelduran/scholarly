import { Controller } from '@nestjs/common';
import { TaskProcessorService } from './task-processor.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common';

@Controller()
export class TaskProcessorController {
  constructor(private readonly taskProcessorService: TaskProcessorService) {}

  @MessagePattern('create_task')
  create(@Payload() data: CreateTaskDto, @Ctx() context: RmqContext) {
    return this.taskProcessorService.generateTask(data);
  }
}
