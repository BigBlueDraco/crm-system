import { Injectable } from '@nestjs/common';
import { Login } from './types/login';
import { ResponseAuth } from './types/response-auth';
import { Registration } from './types/registration';
import { ResetPasswordBody } from './types/reset-password';

@Injectable()
export class AuthService {
  async login(login: Login): Promise<ResponseAuth> {}
  async registration(registration: Registration): Promise<ResponseAuth> {}
  async createRegistrationRequest(email: string): Promise<void> {}
  async forgotPassword(email: string): Promise<void> {}
  async changePassword(
    id: number,
    changePassword: ResetPasswordBody,
  ): Promise<ResponseAuthDto> {}
  createRegistrationUrl(email: string) {}
  createForgotPasswordUrl(email: string) {}
}
