import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  ClassroomDocument,
  ClassroomSchema,
  DatabaseModule,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsRepository } from './classrooms.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ClassroomDocument.name, schema: ClassroomSchema },
    ]),
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
  controllers: [ClassroomsController],
  providers: [ClassroomsService, ClassroomsRepository],
})
export class ClassroomsModule {}
