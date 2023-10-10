import { ApiProperty } from '@nestjs/swagger';
import { Login } from '../types/login';
import { Registration } from '../types/registration';

export class RegistrationDto implements Registration {
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'First name',
    example: 'Benjamin ',
    type: String,
  })
  firstName: string;
  @ApiProperty({
    description: 'Last Name',
    example: 'Turner',
    type: String,
  })
  lastName: string;
  @ApiProperty({
    description: 'Middle name',
    example: 'Michael ',
    type: String,
  })
  middleName: string;
  @ApiProperty({
    description: 'User`s email',
    example: 'mail@example.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'Phone',
    example: '+380684834042',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  password: string;
  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  confirmPassword: string;
}