import { UserDto } from 'src/user/dto/user.dto';
import { Employee } from '../types/employee';

export class EmployeeDto extends UserDto implements Employee {}
