import { ApiProperty } from '@nestjs/swagger';
import { Right } from '../types/Right';

export class RightDto implements Right {
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: 'CanDoSomething',
    example: 'CanDoSomething',
    type: String,
  })
  name: string;
}
