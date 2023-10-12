import { CreateEvent } from '../types/create-event';
import { EventDto } from './event.dto';

export class CreateEventDto extends EventDto implements CreateEvent {
  ownerId: number;
  memberIds?: number[];
}
