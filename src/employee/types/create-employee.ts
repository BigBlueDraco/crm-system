import { Employee } from './employee';

export interface CreateEmployee extends Employee {
  password: string;
}
