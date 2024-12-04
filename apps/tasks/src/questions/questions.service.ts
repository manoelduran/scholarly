import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './questions.repository';
import { CreateQuestionDto } from '@app/common';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async create(createQuestionDto: CreateQuestionDto) {
    await this.validateCreateQuestionDto(createQuestionDto);
    console.log('Creating question:', createQuestionDto);
    return this.questionsRepository.create(createQuestionDto);
  }
  private async validateCreateQuestionDto(
    createQuestionDto: CreateQuestionDto,
  ) {
    try {
      await this.questionsRepository.findOne({
        header: createQuestionDto.header,
      });
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
