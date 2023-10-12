import { Event } from './event';

export interface CreateEvent extends Event {
  ownerId: number;
  memberIds?: number[];
}
