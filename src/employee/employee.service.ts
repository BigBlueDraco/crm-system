import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployee } from './types/create-employee';
import { PrismaService } from '@/prisma/service/prisma.service';
import { UserService } from '@/user/user.service';
import { ResponseCustomer } from '@/customer/types/response-customer';
import { ResponseEmployee } from './types/response-employee';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findFirst(where: any) {
    try {
      return await this.prismaService.employee.findFirst({
        where,
        include: {
          role: true,
          user: true,
        },
      });
    } catch (err) {
      return err;
    }
  }
  async create(createEmployee: CreateEmployee) {
    try {
      const { password, ...data } = createEmployee;
      let employeeData: any = {
        password: password,
        role: { connect: { id: 1 } },
      };
      const exEmployee = await this.findFirst({
        user: { email: data.email, phone: data.phone },
      });
      if (exEmployee) {
        throw new ConflictException(`User already exist`);
      }
      data.phone = data.phone.toLocaleLowerCase();
      data.email = data.email.toLocaleLowerCase();
      const exUser = await this.userService.findAll({
        email: data.email,
        phone: data.phone,
      });
      if (exUser[0]) {
        employeeData.user = { connect: { id: exUser[0].id } };
      } else {
        const newUser = await this.userService.create(data);
        employeeData.user = { connect: { id: newUser.id } };
      }
      const {
        user,
        role,
        id: empId,
        ...employee
      } = await this.prismaService.employee.create({
        data: employeeData,
        include: {
          role: true,
          user: true,
        },
      });
      return { ...user, empId, role };
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return `This action returns all employee`;
  }

  async findOne(id: number) {
    try {
      const emp = await this.prismaService.employee.findUnique({
        where: { id },
        include: {
          role: true,
          user: true,
        },
      });
      if (!emp) {
        throw new NotFoundException(`Employee with id: ${id} not found`);
      }
      return emp;
    } catch (err) {
      return err;
    }
  }

  update(id: number, updateEmployeeDto: unknown) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number): Promise<ResponseCustomer> {
    const {
      user,
      role,
      id: empId,
    } = await this.prismaService.employee.delete({
      where: { id },
      include: { user: true, role: true },
    });
    return { ...user, id: empId };
  }
}
