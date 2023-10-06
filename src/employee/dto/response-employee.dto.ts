import { ApiProperty } from '@nestjs/swagger';
import { ResponseEmployee } from '../types/response-employee';
import { ResponseRoleDto } from '@/role/dto/response-role.dto';

export class ResponseEmployeeDto implements ResponseEmployee {
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
    type: ResponseRoleDto,
  })
  role: ResponseRoleDto;
}
