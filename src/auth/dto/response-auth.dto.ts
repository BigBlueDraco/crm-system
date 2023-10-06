import { ResponseEmployee } from '@/employee/types/response-employee';
import { ResponseAuth } from '../types/response-auth';
import { TokensDto } from './tokenst.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseEmployeeDto } from '@/employee/dto/response-employee.dto';

export class ResponseAuthDto implements ResponseAuth {
  @ApiProperty({ type: TokensDto })
  tokens: TokensDto;
  @ApiProperty({ type: ResponseEmployeeDto })
  employee: ResponseEmployeeDto;
}
