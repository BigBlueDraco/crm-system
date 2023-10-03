import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ResetPasswordParamsDto } from './dto/reset-password-params.dto';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(loginDto: LoginDto): Promise<ResponseAuthDto> {
    return await this.authService.login(loginDto);
  }
  async registration(
    registrationDto: RegistrationDto,
  ): Promise<ResponseAuthDto> {
    return await this.authService.registration(loginDto);
  }
  async createRegistrationRequest(@Body('emai') email: string): Promise<void> {}
  async forgotPassword(@Body('emai') email: string): Promise<void> {}
  async changeForgotPassword(
    @Param() resetPasswordParamsDto: ResetPasswordParamsDto,
    @Body() resetPasswordBody: ResetPasswordBodyDto,
  ): Promise<ResponseAuthDto> {
    return await this.authService.login(loginDto);
  }
  async changePassword(
    @Headers() headers,
    @Body() resetPasswordBody: ResetPasswordBody,
  ): Promise<ResponseAuthDto> {
    return await this.authService.login(loginDto);
  }
}
