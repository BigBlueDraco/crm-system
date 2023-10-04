import { ResponseRole } from '@/role/types/response-role';
import { Employee } from './employee';

export interface ResponseEmployee extends Employee {
  id: number;
  role?: ResponseRole;
}
