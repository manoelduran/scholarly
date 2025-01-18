import { Injectable } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolDto } from '@app/common';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}
  create(createSchoolDto: CreateSchoolDto) {
    return this.schoolsRepository.create(createSchoolDto);
  }
}
