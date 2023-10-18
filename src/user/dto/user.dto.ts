import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { User } from '../types/user';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
export class UserDto implements User {
  @ApiProperty({
    description: 'First name',
    example: 'Benjamin',
    type: String,
  })
  @IsString()
  @IsAlpha()
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Turner',
    type: String,
  })
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Middle name',
    example: 'Michael',
    type: String,
  })
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({
    description: 'User`s email',
    example: 'mail@example.com',
    type: String,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone',
    example: '+380684834042',
    type: String,
  })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
