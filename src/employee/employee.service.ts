import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployee } from './types/create-employee';

import { ResponseEmployee } from './types/response-employee';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  private employeeMaping(array: [any]) {
    return array.map(({ user, id, role, password }) => {
      const { rights: rightsOnRole } = role;
      const rights = rightsOnRole.map((elem) => {
        return { ...elem.right };
      });
      return {
        ...user,
        role: {
          ...role,
          rights,
        },
        id,
        password,
      };
    });
  }
  async findFirst(where: any) {
    try {
      const emp = await this.prismaService.employee.findFirst({
        where,
        include: {
          role: {
            include: {
              rights: {
                include: {
                  right: true,
                },
              },
            },
          },
          user: true,
        },
      });
      return emp ? this.employeeMaping([emp])[0] : null;
    } catch (err) {
      throw err;
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
      const emp = await this.prismaService.employee.create({
        data: employeeData,
        include: {
          role: {
            include: {
              rights: {
                include: {
                  right: true,
                },
              },
            },
          },
          user: true,
        },
      });

      return await this.findOne(emp.id);
    } catch (err) {
      throw err;
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
          role: { include: { rights: { include: { right: true } } } },
          user: true,
        },
      });
      if (!emp) {
        throw new NotFoundException(`Employee with id: ${id} not found`);
      }
      return this.employeeMaping([emp])[0];
    } catch (err) {
      throw err;
    }
  }

  update(id: number, updateEmployeeDto: unknown) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number): Promise<ResponseEmployee> {
    const emp = await this.prismaService.employee.delete({
      where: { id },
      include: { user: true, role: true },
    });
    return this.employeeMaping([emp])[0];
  }
}
