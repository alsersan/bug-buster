import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  seniority: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password: string;
}
