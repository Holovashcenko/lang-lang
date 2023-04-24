import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  F;
  async createUser({ username, email, password, role }: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return newUser;
  }

  async getUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
