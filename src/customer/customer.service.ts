import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '@/prisma/service/prisma.service';
import { UserService } from '@/user/user.service';
import { CreateCustomer } from './types/create-customer';
import { ResponseCustomer } from './types/response-customer';
import { Customer } from '@prisma/client';
import { UpdateCustomer } from './types/update-customer';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  private customerMaping(array: any[]): ResponseCustomer[] {
    return array.map(({ user, id, ...customer }) => ({
      ...user,
      ...customer,
    }));
  }
  async create(createCustomer: CreateCustomer): Promise<ResponseCustomer> {
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
  }

  async findAll(): Promise<ResponseCustomer[]> {
    const customers = await this.prismaService.customer.findMany({
      include: {
        user: true,
      },
    });
    return this.customerMaping(customers);
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
      include: { user: true },
    });
    return this.customerMaping([customer])[0];
  }

  async update(id: number, updateCustomerDto: UpdateCustomer) {}

  async remove(id: number) {
    const customer = await this.prismaService.customer.delete({
      where: { id },
    });
    return this.customerMaping([customer])[0];
  }
}
