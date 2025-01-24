import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolDto } from '@app/common';
import { Types } from 'mongoose';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}
  async create(createSchoolDto: CreateSchoolDto, ownerId: Types.ObjectId) {
    await this.validateCreateSchoolDto(createSchoolDto);
    return this.schoolsRepository.create({
      ...createSchoolDto,
      ownerId,
    });
  }

  private async validateCreateSchoolDto(createSchoolDto: CreateSchoolDto) {
    try {
      await this.schoolsRepository.findOne({
        name: createSchoolDto.name,
        city: createSchoolDto.city,
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException(
      `School ${createSchoolDto.name} already exists.`,
    );
  }
}
