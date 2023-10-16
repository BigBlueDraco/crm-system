import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateCustomer } from '../types/update-customer';
import { CustomerDto } from './customer.dto';

export class UpdateCustomerDto extends CustomerDto implements UpdateCustomer {
  @IsNotEmpty()
  @IsString()
  message: string;
}
