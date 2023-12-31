import { ApiProperty } from '@nestjs/swagger';
import { Registration } from '../types/registration';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmployeeDto } from '../../employee/dto/employee.dto';

export class RegistrationDto extends EmployeeDto implements Registration {
  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    description: 'Employee`s password',
    example: 'password1234',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
