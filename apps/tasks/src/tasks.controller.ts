import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  async list() {
    return await this.tasksService.find();
  }
  @Get()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }
}
