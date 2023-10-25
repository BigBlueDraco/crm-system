import { Employee } from 'src/employee/types/employee';
import { Event } from './event';
import { User } from 'src/user/types/user';

export interface ResponseEvent extends Event {
  id: number;
  members: User[];
  owner: Employee;
}
