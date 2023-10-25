import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICustomer } from '../types/customer';
import { UserDto } from 'src/user/dto/user.dto';

export class CustomerDto extends UserDto implements ICustomer {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Message',
    example: 'Some customer text',
    type: String,
  })
  message: string;
}
