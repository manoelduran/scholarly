import { IsEmail } from 'class-validator';

export class EmitNotificationsDto {
  @IsEmail()
  email: string;
}
