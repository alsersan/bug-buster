import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
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

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto);
  }

  async deleteUser(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v -password')
      .populate('projects', '-__v -members._id');
  }
}
