import { Employee } from '@/employee/types/employee';
import { Event } from '../types/event';
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeDto } from '@/employee/dto/employee.dto';

export class EventDto implements Event {
  @ApiProperty({
    description: 'Owner',
    type: EmployeeDto,
  })
  owner: EmployeeDto;
  @ApiProperty({
    description: 'name',
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'Start time of Event',
    type: Date,
  })
  from: Date;
  @ApiProperty({
    description: 'End time of Event',
    type: Date,
  })
  to: Date;
}
