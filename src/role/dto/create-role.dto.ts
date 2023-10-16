import { ApiProperty } from '@nestjs/swagger';
import { CreateRole } from '../types/create-role';
import { IsString } from 'class-validator';

export class CreateRoleDto implements CreateRole {
  @ApiProperty({
    description: 'Array of rights Ids ',
    example: [1, 4, 8],
    type: [Number],
  })
  rightsIds: [number];
  @ApiProperty({
    description: 'Name of role',
    example: 'Admin',
    type: String,
  })
  @IsString()
  name: string;
}
