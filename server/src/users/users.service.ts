import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

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

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto);
  }

  async deleteUser(userId: string) {
    const deletion = await this.userModel.findByIdAndDelete(userId);
    console.log(deletion);
    return deletion;
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v -password')
      .populate('projects', '-__v -members._id')
      .populate('tickets', '-__v -modifications -assignedTo -author');
  }
}
