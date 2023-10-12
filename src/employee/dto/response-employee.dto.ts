import { ResponseRoleDto } from '@/role/dto/response-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseEmployee } from '../types/response-employee';
import { EmployeeDto } from './employee.dto';

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
