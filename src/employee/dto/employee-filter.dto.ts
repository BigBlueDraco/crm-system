import { EmployeeFilter } from '../types/employee-filter';
import { EmployeeDto } from './employee.dto';

export class EmployeeFilterDto extends EmployeeDto implements EmployeeFilter {}
