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
  UserDocument,
} from '@app/common';
import { StudentAnswerService } from './answers.service';

@Controller('questions')
export class StudentAnswerController {
  constructor(private readonly studentAnswerService: StudentAnswerService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() answerTaskDto: AnswerTaskDto,
    @CurrentUser() user: UserDocument,
  ) {
    console.log(user);
    return this.studentAnswerService.answer(answerTaskDto, user._id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.studentAnswerService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentAnswerService.findOne(+id);
  }
  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  // ) {
  //   return this.studentAnswerService.update(+id, updateQuestionDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentAnswerService.remove(+id);
  }
}
