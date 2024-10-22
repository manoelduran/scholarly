import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as Joi from 'joi';
import { AuthService } from './auth.service';
import { DatabaseModule, UserDocument, UserSchema } from '@app/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: AUTH_SERVICE,
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.TCP,
    //       options: {
    //         host: configService.get('AUTH_HOST'),
    //         port: configService.get('AUTH_PORT'),
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    //   {
    //     name: PAYMENTS_SERVICE,
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.TCP,
    //       options: {
    //         host: configService.get('PAYMENTS_HOST'),
    //         port: configService.get('PAYMENTS_PORT'),
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
