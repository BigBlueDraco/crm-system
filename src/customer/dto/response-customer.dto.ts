import { ApiProperty } from '@nestjs/swagger';
import { ResponseCustomer } from '../types/response-customer';
import { CustomerDto } from './customer.dto';

export class ResponseCustomerDto
  extends CustomerDto
  implements ResponseCustomer
{
  @ApiProperty({
    description: 'id',
    example: 1,
    type: Number,
  })
  id: number;
}
