import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Ticket } from 'src/tickets/schemas/ticket.schema';
import { Members } from '../schemas/members.schema';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
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
  dateCreated: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dateClosed: string;

  @Type(() => Ticket)
  @IsOptional()
  @IsNotEmpty()
  tickets: Ticket[];

  @Type(() => Members)
  @IsOptional()
  @IsNotEmpty()
  members: Members;
}
