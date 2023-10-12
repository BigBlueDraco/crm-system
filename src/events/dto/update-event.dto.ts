import { ApiProperty } from '@nestjs/swagger';
import { UpdateEvent } from '../types/update-event';
import { EventDto } from './event.dto';

export class UpdateEventDto extends EventDto implements UpdateEvent {
  @ApiProperty({
    description: 'ownerId',
    example: 1,
    type: Number,
  })
  ownerId: number;
}
