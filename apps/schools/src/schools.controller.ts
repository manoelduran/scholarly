import { Controller, Post, UseGuards } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { Payload } from '@nestjs/microservices';
import {
  CreateSchoolDto,
  CurrentUser,
  JwtAuthGuard,
  Roles,
  RolesEnum,
  UserDocument,
} from '@app/common';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.Owner)
  @Post()
  create(
    @CurrentUser() user: UserDocument,
    @Payload() createSchoolDto: CreateSchoolDto,
  ) {
    return this.schoolsService.create(createSchoolDto);
  }
}
