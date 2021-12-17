import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { roles } from 'src/utils/roles';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(roles.admin)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.getAllUsers();
  }

  @Get('token')
  async findOneWithToken(@Req() req: Request) {
    return await this.usersService.getUserWithToken(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Roles(roles.admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Roles(roles.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
