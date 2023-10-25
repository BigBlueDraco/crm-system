import { EmployeeDto } from 'src/employee/dto/employee.dto';
import { ResponseEvent } from '../types/response-event';
import { EventDto } from './event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

export class ResponseEventDto extends EventDto implements ResponseEvent {
  @ApiProperty({
    description: 'Owner',
    type: EmployeeDto,
  })
  owner: EmployeeDto;
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: 'Members',
    type: [UserDto],
  })
  members: UserDto[];
}
