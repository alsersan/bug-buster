import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Members } from '../schemas/members.schema';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  dateCreated: string;

  @Type(() => Members)
  @IsNotEmpty()
  members: Members;
}
