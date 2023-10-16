import { ApiProperty } from '@nestjs/swagger';
import { CreateEvent } from '../types/create-event';
import { EventDto } from './event.dto';

export class CreateEventDto extends EventDto implements CreateEvent {
  @ApiProperty({
    description: 'ownerId',
    example: 1,
    type: Number,
  })
  ownerId: number;
  @ApiProperty({
    description: 'membersIds',
    example: [1, 4, 26],
    type: [Number],
  })
  memberIds?: number[];
}
