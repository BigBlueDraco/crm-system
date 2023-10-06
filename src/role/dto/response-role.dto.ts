import { ResponseRole } from '../types/response-role';
import { RightDto } from '../../rights/dto/right.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRoleDto implements ResponseRole {
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: 'Employee`s role',
    example: 'Admin',
    type: String,
  })
  name: string;
  @ApiProperty({
    type: [RightDto],
  })
  rights: RightDto[];
}
