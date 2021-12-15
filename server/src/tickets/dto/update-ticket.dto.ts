import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Modification } from 'src/modifications/schemas/modification.schema';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @Exclude()
  dateRegistered: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dateClosed: string;

  @IsOptional()
  @Type(() => Project)
  @Exclude()
  project: Project;

  @IsOptional()
  @Type(() => User)
  @Exclude()
  author: User;

  @Type(() => User)
  @IsOptional()
  @IsNotEmpty()
  assignedTo: User[];

  @Type(() => Modification)
  @IsOptional()
  @IsNotEmpty()
  modifications: Modification[];
}
