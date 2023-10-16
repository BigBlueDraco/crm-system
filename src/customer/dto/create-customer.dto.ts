import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomer } from '../types/create-customer';
import { CustomerDto } from './customer.dto';

export class CreateCustomerDto extends CustomerDto implements CreateCustomer {
  @IsNotEmpty()
  @IsString()
  message: string;
}
