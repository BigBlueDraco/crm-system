import { ResponseCustomer } from '../types/response-customer';

export class ResponseCustomerDto implements ResponseCustomer {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}
