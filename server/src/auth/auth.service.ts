import { Injectable } from '@nestjs/common';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    try {
      const user = await this.userService.getUser(email);
      if (!user) {
        return null;
      }

      const passEq = await bcrypt.compare(password, user.password);

      if (user && passEq) {
        Role[user.role];
        return user;
      }
    } catch (error) {
      error.message;
    }
  }

  async login(user: User): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        role: user.role,
        id: user.id,
        username: user.username,
      },
    };
  }
}
