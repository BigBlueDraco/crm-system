import { ApiProperty } from '@nestjs/swagger';
import { Login } from '../types/login';

export class LoginDto implements Login {
  @ApiProperty({
    description: 'Employee`s mail',
    example: 'mail@example.com',
    type: String,
  })
  login: string;
  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  password: string;
}
