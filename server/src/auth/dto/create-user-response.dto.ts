import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The id of the user' })
  id: string;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The role of the user' })
  role: string;
}

export class CreateUserResponseDto {
  @ApiProperty({ description: 'The access token of the user' })
  token: string;

  @ApiProperty({ description: 'The user object' })
  user: UserDto;
}
