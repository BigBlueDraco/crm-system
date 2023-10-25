import { ICreateCustomer } from '../types/create-customer';
import { CustomerDto } from './customer.dto';

export class CreateCustomerDto extends CustomerDto implements ICreateCustomer {}
