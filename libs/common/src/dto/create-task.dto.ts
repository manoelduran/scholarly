import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  instructions?: string;
  @IsBoolean()
  isGraded: boolean;
  @IsNumber()
  totalScore?: number;
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;
}
