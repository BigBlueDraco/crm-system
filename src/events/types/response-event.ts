import { User } from '@/user/types/user';
import { Event } from './event';

export interface ResponseEvent extends Event {
  id: number;
  members: User[];
}
