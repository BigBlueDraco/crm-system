import { Right } from '@/rights/types/Right';
import { ApiProperty } from '@nestjs/swagger';

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
