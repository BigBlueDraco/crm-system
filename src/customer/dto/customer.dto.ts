import { UserDto } from '@/user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Customer } from '../types/customer';

export class CustomerDto extends UserDto implements Customer {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Message',
    example: 'Some customer text',
    type: String,
  })
  message: string;
}
