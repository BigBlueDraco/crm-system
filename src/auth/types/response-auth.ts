import { ResponseEmployee } from 'src/employee/types/response-employee';
import { Tokens } from './token';

export interface ResponseAuth {
  tokens: Tokens;
  employee: ResponseEmployee;
}
