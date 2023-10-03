import { ResetPasswordParams } from '../types/reset-password';

export class ResetPasswordParamsDto implements ResetPasswordParams {
  jwt: string;
}
