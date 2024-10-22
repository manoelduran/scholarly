import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async create(createQuestionDto: CreateQuestionDto) {
    await this.validateCreateQuestionDto(createQuestionDto);
    return this.questionsRepository.create({
      ...createQuestionDto,
    });
  }
  private async validateCreateQuestionDto(
    createQuestionDto: CreateQuestionDto,
  ) {
    try {
      await this.questionsRepository.findOne({ text: createQuestionDto.text });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('This question already exists.');
  }
  async findAll() {
    return await this.questionsRepository.find({});
  }

  async findOne(id: number) {
    return await this.questionsRepository.findOne({ _id: id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionsRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateQuestionDto,
    );
  }

  async remove(id: number) {
    return await this.questionsRepository.findOneAndDelete({
      _id: id,
    });
  }
}
