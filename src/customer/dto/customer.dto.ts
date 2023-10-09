import { UserDto } from '@/user/dto/user.dto';
import { Customer } from '../types/customer';

export class CustomerDto extends UserDto implements Customer {}
