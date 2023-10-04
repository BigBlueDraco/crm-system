import { Login } from '../types/login';
import { Registration } from '../types/registration';

export class RegistrationDto implements Registration {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  password: string;
}
