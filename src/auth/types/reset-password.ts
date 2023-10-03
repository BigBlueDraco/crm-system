export interface ResetPasswordParams {
  jwt: string;
}
export interface ResetPasswordBody {
  password: string;
  confirmPassword: string;
}
