import { Controller, Post } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { Payload } from '@nestjs/microservices';
import { CreateSchoolDto } from '@app/common';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Payload() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }
}
