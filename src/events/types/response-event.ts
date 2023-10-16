import { User } from '@/user/types/user';
import { Event } from './event';
import { Employee } from '@/employee/types/employee';

export interface ResponseEvent extends Event {
  id: number;
  members: User[];
  owner: Employee;
}
