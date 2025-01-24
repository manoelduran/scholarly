import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import {
  AUTH_SERVICE,
  ClassroomDocument,
  ClassroomSchema,
  DatabaseModule,
  LoggerModule,
  SchoolDocument,
  SchoolSchema,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchoolsRepository } from './schools.repository';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository],
})
export class SchoolsModule {}
