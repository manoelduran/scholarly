import { Injectable } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}
  create(): string {
    return 'Hello World!';
  }
}
