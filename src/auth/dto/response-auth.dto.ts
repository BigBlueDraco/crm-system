import { ResponseEmployee } from '@/employee/types/response-employee';
import { ResponseAuth } from '../types/response-auth';
import { TokensDto } from './tokenst.dto';

export class ResponseAuthDto implements ResponseAuth {
  tokens: TokensDto;
  employee: ResponseEmployee;
}
