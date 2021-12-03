import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async loginUser(email: string, plainTextPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isCorrectPassword = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const jwtToken = jwt.sign(
      {
        user: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
      },
    );
    return { jwtToken };
  }
}
