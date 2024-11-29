import { Controller, Get } from '@nestjs/common';
import { TaskProcessorService } from './task-processor.service';

@Controller()
export class TaskProcessorController {
  constructor(private readonly taskProcessorService: TaskProcessorService) {}

  @Get()
  getHello(): string {
    return this.taskProcessorService.getHello();
  }
}
