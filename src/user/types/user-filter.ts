import { User } from './user';

export interface UserFilter {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
}
