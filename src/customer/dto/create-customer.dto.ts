import { CreateCustomer } from '../types/create-customer';

export class CreateCustomerDto implements CreateCustomer {
  message: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
