import { Employee } from 'src/employee/types/employee';
import { Event } from './event';
import { IUser } from 'src/user/types/user';

export interface ResponseEvent extends Event {
  id: number;
  members: IUser[];
  owner: Employee;
}
