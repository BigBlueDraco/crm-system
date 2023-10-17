import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Login } from './types/login';
import { Registration } from './types/registration';
import { ResetPasswordBody } from './types/reset-password';
import { EmployeeService } from '@/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  userService: any;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}
  private checkPasswordConfirming({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords dont mathing');
    }
  }
  async login(loginData: Login) {
    try {
      const { login, password } = loginData;
      const existEmployee = await this.employeeService.findFirst({
        user: {
          email: login.toLowerCase(),
        },
      });
      if (!existEmployee) {
        throw new HttpException(`Unvalid user data`, HttpStatus.CONFLICT);
      }
      const isValidPassword = await compare(password, existEmployee.password);
      if (!isValidPassword) {
        throw new HttpException(`Unvalid user data`, HttpStatus.CONFLICT);
      }
      const {
        password: exPassword,
        userId,
        roleId,
        user,
        ...res
      } = existEmployee;
      return {
        tokens: {
          access: this.jwtService.sign({
            id: existEmployee.id,
            email: existEmployee.email,
            role: existEmployee.role,
          }),
          refresh: 'test',
        },
        employee: { ...user, ...res },
      };
    } catch (err) {
      throw err;
    }
  }
  async registration(registration: Registration) {
    try {
      const { password, confirmPassword, ...employee } = registration;
      this.checkPasswordConfirming({ password, confirmPassword });
      const hashedPassword = await hash(password, 10);
      const newEmployee = await this.employeeService.create({
        ...employee,
        password: hashedPassword,
      });
      return {
        tokens: {
          access: await this.jwtService.sign({
            id: newEmployee.id,
            email: newEmployee.email,
            role: newEmployee.role,
          }),
          refresh: 'test',
        },
        employee: newEmployee,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createRegistrationRequest(email: string): Promise<void> {}
  async forgotPassword(email: string): Promise<void> {}
  async changePassword(id: number, changePassword: ResetPasswordBody) {}
  createRegistrationUrl(email: string) {}
  createForgotPasswordUrl(email: string) {}
}
