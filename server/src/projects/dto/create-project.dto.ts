import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Members } from '../schemas/members.schema';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dateCreated: Date;

  @Type(() => Members)
  @IsNotEmpty()
  members: Members;
}
