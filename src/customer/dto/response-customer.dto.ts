import { ResponseCustomer } from '../types/response-customer';
import { CustomerDto } from './customer.dto';

export class ResponseCustomerDto
  extends CustomerDto
  implements ResponseCustomer {}
