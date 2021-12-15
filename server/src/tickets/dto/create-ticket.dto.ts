import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsDateString()
  dateCreated: Date;

  @Type(() => Project)
  @IsNotEmpty()
  project: Project;

  @Type(() => User)
  @IsNotEmpty()
  author: User;

  @Type(() => User)
  @IsOptional()
  @IsNotEmpty()
  assignedTo: User[];
}
