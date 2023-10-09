import { ApiProperty } from '@nestjs/swagger';
import { UpdateEmployee } from '../types/update-employee';
import { EmployeeDto } from './employee.dto';

export class UpdateEmployeeDto extends EmployeeDto implements UpdateEmployee {
  @ApiProperty({ description: 'roleId', example: 1, type: String })
  roleId: string;
}
