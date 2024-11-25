import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CurrentUser, JwtAuthGuard, UserDocument } from '@app/common';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.questionsService.create(createQuestionDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.questionsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
