import { ApiProperty } from '@nestjs/swagger';
import { Customer } from './customer';

export interface ResponseCustomer extends Customer {
  id: number;
}
