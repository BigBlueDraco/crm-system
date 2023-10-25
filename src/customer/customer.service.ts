import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomer } from './types/create-customer';
import { ResponseCustomer } from './types/response-customer';
import { UpdateCustomer } from './types/update-customer';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  private customerMaping(array: any[]): ResponseCustomer[] {
    try {
      return array.map(({ user, id, ...customer }) => ({
        ...user,
        ...customer,
      }));
    } catch (err) {
      throw err;
    }
  }
  async create(createCustomer: CreateCustomer): Promise<ResponseCustomer> {
    try {
      const { message, ...userData } = createCustomer;
      let customerData: any = {};
      createCustomer.phone = createCustomer.phone.toLocaleLowerCase();
      createCustomer.email = createCustomer.email.toLocaleLowerCase();
      const exUser = await this.userService.findAll({
        email: createCustomer.email,
        phone: createCustomer.phone,
      });
      if (exUser[0]) {
        customerData.user = { connect: { id: exUser[0].id } };
      } else {
        const newUser = await this.userService.create(userData);
        customerData.user = { connect: { id: newUser.id } };
      }
      const customer = await this.prismaService.customer.create({
        data: customerData,
        include: {
          user: true,
        },
      });
      return this.customerMaping([customer])[0];
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<ResponseCustomer[]> {
    try {
      const customers = await this.prismaService.customer.findMany({
        include: {
          user: true,
        },
      });
      return this.customerMaping(customers);
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      const customer = await this.prismaService.customer.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!customer) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }
      return this.customerMaping([customer])[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomer) {}

  async remove(id: number) {
    try {
      await this.findOne(id);
      const customer = await this.prismaService.customer.delete({
        where: { id },
      });
      return this.customerMaping([customer])[0];
    } catch (err) {
      throw err;
    }
  }
}
