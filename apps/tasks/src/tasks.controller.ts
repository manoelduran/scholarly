import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @MessagePattern('create_question')
  getHello(): string {
    return this.tasksService.getHello();
  }
}
