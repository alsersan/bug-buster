import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from 'src/tickets/schemas/ticket.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateCommentDto {
  @IsNotEmpty()
  @Type(() => User)
  author: User;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  dateCreated: Date;

  @IsNotEmpty()
  @Type(() => Ticket)
  ticket: Ticket;
}
