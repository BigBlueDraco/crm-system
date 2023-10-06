import { ApiProperty } from '@nestjs/swagger';
import { UpdateRole } from '../types/update-role';

export class UpdateRoleDto implements UpdateRole {
  @ApiProperty({
    description: 'Array of rights Ids ',
    example: [32, 2],
    type: [Number],
  })
  addRights: number[];
  @ApiProperty({
    description: 'Array of rights Ids',
    example: [1, 4, 8],
    type: [Number],
  })
  removeRights: number[];
  @ApiProperty({
    description: 'Name of role',
    example: 'Admin',
    type: String,
  })
  name: string;
}
