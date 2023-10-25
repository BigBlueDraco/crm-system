import { User } from './user.entitity';

export interface UserFilter {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
}
