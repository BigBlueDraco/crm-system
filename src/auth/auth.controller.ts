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
import { ResetPasswordBody } from './types/reset-password';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('/registration')
  async registration(
    @Body()
    registrationDto: RegistrationDto,
  ): Promise<ResponseAuthDto> {
    console.log(registrationDto);
    return await this.authService.registration(registrationDto);
  }
  async createRegistrationRequest(@Body('emai') email: string): Promise<void> {}
  async forgotPassword(@Body('emai') email: string): Promise<void> {}
  async changeForgotPassword(
    @Param() resetPasswordParamsDto: ResetPasswordParamsDto,
    @Body() resetPasswordBody: ResetPasswordBodyDto,
  ) {}
  async changePassword(
    @Headers() headers,
    @Body() resetPasswordBody: ResetPasswordBody,
  ) {}
}
