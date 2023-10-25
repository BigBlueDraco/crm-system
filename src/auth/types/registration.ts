import { CreateEmployee } from 'src/employee/types/create-employee';

export interface Registration extends CreateEmployee {
  confirmPassword: string;
}
