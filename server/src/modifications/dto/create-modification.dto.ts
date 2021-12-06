import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from 'src/tickets/schemas/ticket.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateModificationDto {
  @IsNotEmpty()
  @IsString()
  modifiedProperty: string;

  @IsNotEmpty()
  @IsString()
  oldValue: string;

  @IsNotEmpty()
  @IsString()
  newValue: string;

  @IsNotEmpty()
  @IsString()
  dateCreated: string;

  @Type(() => User)
  @IsNotEmpty()
  author: User;

  @Type(() => Ticket)
  @IsNotEmpty()
  ticket: Ticket;
}
