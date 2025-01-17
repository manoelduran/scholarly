import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import {
  ClassroomDocument,
  ClassroomSchema,
  DatabaseModule,
  LoggerModule,
  SchoolDocument,
  SchoolSchema,
} from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsRepository } from './schools.repository';
import { ClassroomsModule } from './classrooms/classrooms.module';

@Module({
  imports: [
    DatabaseModule,
    ClassroomsModule,
    LoggerModule,
    DatabaseModule.forFeature([
      { name: SchoolDocument.name, schema: SchoolSchema },
      { name: ClassroomDocument.name, schema: ClassroomSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository],
})
export class SchoolsModule {}
