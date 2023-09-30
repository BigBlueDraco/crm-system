import { EmployeeFilter } from '../types/employee-filter';

export class EmployeeFilterDto implements EmployeeFilter {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
