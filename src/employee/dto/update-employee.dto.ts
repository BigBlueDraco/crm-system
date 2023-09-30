import { UpdateEmployee } from '../types/update-employee';

export class UpdateEmployeeDto implements UpdateEmployee {
  roleId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
