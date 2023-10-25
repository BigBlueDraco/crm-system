import { ApiProperty } from '@nestjs/swagger';
import { ResponseEmployee } from '../types/response-employee';
import { EmployeeDto } from './employee.dto';
import { ResponseRoleDto } from 'src/role/dto/response-role.dto';

export class ResponseEmployeeDto
  extends EmployeeDto
  implements ResponseEmployee
{
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    type: ResponseRoleDto,
  })
  role: ResponseRoleDto;
}
