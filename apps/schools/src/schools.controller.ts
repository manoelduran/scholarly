import { Controller, Get } from '@nestjs/common';
import { SchoolsService } from './schools.service';

@Controller()
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  getHello(): string {
    return this.schoolsService.getHello();
  }
}
