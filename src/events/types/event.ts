import { Employee } from '@/employee/types/employee';

export interface Event {
  name: string;
  from: Date;
  to: Date;
  owner: Employee;
}
