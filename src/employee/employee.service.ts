import { Injectable } from '@nestjs/common';
import { CreateEmployee } from './types/create-employee';
import { ResponseEmployee } from './types/response-employee';
import { PrismaService } from '@/prisma/service/prisma.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createEmployee: CreateEmployee) {
    const { password, ...data } = createEmployee;
    const { role, user, ...employee } =
      await this.prismaService.employee.create({
        data: {
          password: password,
          role: { connect: { id: 2 } },
          user: { create: data },
        },
        include: {
          role: true,
          user: true,
        },
      });
    return { ...user, role };
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: unknown) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
