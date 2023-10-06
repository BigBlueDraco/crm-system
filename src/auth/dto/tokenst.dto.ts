import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../types/token';

export class TokensDto implements Tokens {
  @ApiProperty({
    description: 'JWT token',
    example: 'JWT',
    type: String,
  })
  access: string;
  @ApiProperty({
    description: 'JWT reset token',
    example: 'reset',
    type: String,
  })
  refresh: string;
}
