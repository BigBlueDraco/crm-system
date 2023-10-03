import { Login } from '../types/login';

export class LoginDto implements Login {
  login: string;
  password: string;
}
