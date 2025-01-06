import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  AnswerTaskDto,
  CurrentUser,
  JwtAuthGuard,
  Roles,
  UserDocument,
} from '@app/common';
import { StudentAnswerService } from './answers.service';
import { Types } from 'mongoose';

@Controller('answers')
export class StudentAnswerController {
  constructor(private readonly studentAnswerService: StudentAnswerService) {}
  @UseGuards(JwtAuthGuard)
  @Post(':taskId')
  @Roles('student')
  @UsePipes(new ValidationPipe())
  async create(
    @Param('taskId') taskId: Types.ObjectId,
    @Body() answerTaskDto: AnswerTaskDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.studentAnswerService.answer(answerTaskDto, taskId, user._id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.studentAnswerService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentAnswerService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentAnswerService.remove(id);
  }
}
