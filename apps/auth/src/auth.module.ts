import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as Joi from 'joi';
import { AuthService } from './auth.service';
import {
  DatabaseModule,
  TASKS_SERVICE,
  UserDocument,
  UserSchema,
} from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: TASKS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          Transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            noAck: false,
            queue: 'tasks_queue',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
