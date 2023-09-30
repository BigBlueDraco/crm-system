import { Employee } from './employee';

export interface UpdateEmployee extends Employee {
  roleId: string;
}
