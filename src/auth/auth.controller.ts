import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ResetPasswordParamsDto } from './dto/reset-password-params.dto';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';
import { ResetPasswordBody } from './types/reset-password';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Authorized',
    type: ResponseAuthDto,
  })
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (err) {
      return err;
    }
  }

  @Post('/registration')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Employee created and authorized',
    type: ResponseAuthDto,
  })
  @ApiConflictResponse({ description: 'User with email already exists' })
  async registration(
    @Body()
    registrationDto: RegistrationDto,
  ): Promise<ResponseAuthDto> {
    try {
      return await this.authService.registration(registrationDto);
    } catch (err) {
      return err;
    }
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
