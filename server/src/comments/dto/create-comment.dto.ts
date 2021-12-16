import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
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
}
