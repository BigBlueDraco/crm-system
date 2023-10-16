import { IsDate, IsDateString, IsString } from 'class-validator';
import { Event } from '../types/event';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto implements Event {
  @ApiProperty({
    description: 'name',
    type: String,
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Start time of Event',
    type: Date,
  })
  @IsDateString()
  from: Date;
  @ApiProperty({
    description: 'End time of Event',
    type: Date,
  })
  @IsDateString()
  to: Date;
}
