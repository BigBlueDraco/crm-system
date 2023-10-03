import { ResetPasswordBody } from '../types/reset-password';

export class ResetPasswordBodyDto implements ResetPasswordBody {
  password: string;
  confirmPassword: string;
}
