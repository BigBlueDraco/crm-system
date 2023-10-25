import { User } from '../../user/types/user';

export interface Customer {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}

export interface CustomerFilter extends Customer {}
