import { CreateEmployee } from '@/employee/types/create-employee';

export interface Registration extends CreateEmployee {
  confirmPassword: string;
}
