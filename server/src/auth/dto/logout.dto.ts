import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({ description: 'The status code of the response', default: 200 })
  code: number;

  @ApiProperty({ description: 'The status message of the response' })
  status: string;

  @ApiProperty({ description: 'The message of the response' })
  message: string;
}
