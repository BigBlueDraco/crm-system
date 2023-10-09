import { ApiProperty } from '@nestjs/swagger';
import { UpdateEmployee } from '../types/update-employee';

export class UpdateEmployeeDto implements UpdateEmployee {
  @ApiProperty({ description: 'roleId', example: 1, type: String })
  roleId: string;
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
}
