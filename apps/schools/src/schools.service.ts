import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolDto } from '@app/common';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}
  async create(createSchoolDto: CreateSchoolDto) {
    await this.validateCreateSchoolDto(createSchoolDto);
    return this.schoolsRepository.create(createSchoolDto);
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
