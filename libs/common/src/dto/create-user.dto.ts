import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { RolesEnum } from './user.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @IsNotEmpty({ each: true })
  roles: RolesEnum[];
}
