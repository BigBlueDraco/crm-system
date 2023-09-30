import { ResponseEmployee } from '../types/response-employee';
import { ResponseRoleDto } from '@/role/dto/response-role.dto';

export class ResponseEmployeeDto implements ResponseEmployee {
  id: number;
  role: ResponseRoleDto;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
