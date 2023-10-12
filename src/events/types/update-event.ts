import { Event } from './event';

export interface UpdateEvent extends Event {
  ownerId: number;
}
