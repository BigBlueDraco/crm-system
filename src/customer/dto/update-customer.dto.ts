import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomer } from '../types/update-customer';

export class UpdateCustomerDto implements UpdateCustomer {
  message: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
