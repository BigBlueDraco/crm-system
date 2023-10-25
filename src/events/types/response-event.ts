import { Employee } from '../../employee/types/employee';
import { Event } from './event';
import { User } from '../../user/types/user.entitity';

export interface ResponseEvent extends Event {
  id: number;
  members: User[];
  owner: Employee;
}
