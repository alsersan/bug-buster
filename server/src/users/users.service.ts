import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Request } from 'express';
import { JwtTokenPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUserInfo = { ...createUserDto, password: hashedPassword };
    const newUser = await this.userModel.create(newUserInfo);
    const queryResult = this.userModel.findById(newUser._id);
    return this.processQuery(queryResult);
  }

  async getAllUsers() {
    const queryResult = this.userModel.find();
    return this.processQuery(queryResult);
  }

  async getUserById(userId: string) {
    const queryResult = this.userModel.findById(userId);
    return this.processQuery(queryResult);
  }

  async getUserWithToken(req: Request) {
    const user: JwtTokenPayload = req['user'];
    const queryResult = this.userModel.findById(user.userId);
    return this.processQuery(queryResult);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const queryResult = this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    return this.processQuery(queryResult);
  }

  async updatePasswordWithToken(req: Request) {
    const user: JwtTokenPayload = req['user'];
    const userDB = await this.userModel.findById(user.userId);
    const body = req.body as { currentPassword: string; newPassword: string };
    const isCorrectCurrentPassword = await bcrypt.compare(
      body.currentPassword,
      userDB.password,
    );
    if (!isCorrectCurrentPassword) {
      throw new UnauthorizedException('The current password is incorrect');
    }
    const newHashedPassword = await bcrypt.hash(body.newPassword, 10);
    const queryResult = this.userModel.findByIdAndUpdate(
      user.userId,
      { password: newHashedPassword },
      { new: true },
    );
    return this.processQuery(queryResult);
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    return { deletedUserId: deletedUser._id };
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v -password')
      .populate('projects', '-__v -members._id')
      .populate('tickets', '-__v -assignedTo -author');
  }
}
