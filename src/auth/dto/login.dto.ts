import { ApiProperty } from '@nestjs/swagger';
import { Login } from '../types/login';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto implements Login {
  @ApiProperty({
    description: 'Employee`s mail',
    example: 'mail@example.com',
    type: String,
  })
  @IsEmail()
  @IsString()
  login: string;
  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  @IsString()
  password: string;
}
