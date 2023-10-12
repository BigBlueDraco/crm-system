import { ResponseEvent } from '../types/response-event';
import { EventDto } from './event.dto';
import { UserDto } from '@/user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseEventDto extends EventDto implements ResponseEvent {
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
