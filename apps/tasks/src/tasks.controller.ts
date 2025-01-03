import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  CurrentUser,
  JwtAuthGuard,
  Roles,
  UserDocument,
} from '@app/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  async list() {
    return await this.tasksService.find();
  }
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateTaskDto, @CurrentUser() user: UserDocument) {
    return this.tasksService.create(data, user._id);
  }
}
