import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import {
  DatabaseModule,
  LoggerModule,
  SchoolDocument,
  SchoolSchema,
} from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsRepository } from './schools.repository';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    DatabaseModule.forFeature([
      { name: SchoolDocument.name, schema: SchoolSchema },
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
