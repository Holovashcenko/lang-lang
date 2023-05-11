import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { LocalAuthGuard } from './strategies/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  @ApiTags('auth')
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: CreateUserResponseDto,
  })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    const token = await this.jwtService.sign(payload);
    return {
      user: {
        email: user.email,
        role: user.role,
        id: user.id,
        username: user.username,
      },
      token,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User was logged in',
    type: CreateUserResponseDto,
  })
  @ApiBody({ type: LoginDto })
  async login(@Req() req: any): Promise<CreateUserResponseDto> {
    return this.authService.login(req.user as User);
  }

  @Post('/logout')
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User was logged out',
    type: LogoutDto,
  })
  async logout() {
    return {
      code: 200,
      status: 'success',
      message: 'User was logged out',
    };
  }
}
