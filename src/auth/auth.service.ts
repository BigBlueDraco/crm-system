import { Injectable, BadRequestException } from '@nestjs/common';
import { Login } from './types/login';
import { Registration } from './types/registration';
import { ResetPasswordBody } from './types/reset-password';
import { EmployeeService } from '@/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
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
  async login(login: Login) {}
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
          access: this.jwtService.sign({
            id: newEmployee.id,
            email: newEmployee.email,
            role: newEmployee.role,
          }),
        },
        employee: newEmployee,
      };
    } catch (err) {
      return err;
    }
  }
  async createRegistrationRequest(email: string): Promise<void> {}
  async forgotPassword(email: string): Promise<void> {}
  async changePassword(id: number, changePassword: ResetPasswordBody) {}
  createRegistrationUrl(email: string) {}
  createForgotPasswordUrl(email: string) {}
}
