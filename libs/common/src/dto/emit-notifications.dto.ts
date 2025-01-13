import { IsEmail, IsEnum, IsString } from 'class-validator';
import { SubjectEnum } from './notification.dto';

export class EmitNotificationsDto {
  @IsEmail()
  email: string;

  @IsString()
  text: string;

  @IsEnum(SubjectEnum)
  subject: SubjectEnum;
}
