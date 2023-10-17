import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from './types/create-user';
import { UserFilter } from './types/user-filter';
import { UpdateUser } from './types/update-user';
import { PrismaService } from '../prisma/service/prisma.service';
import { ResponseUser } from './types/response-user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUser: CreateUser): Promise<ResponseUser> {
    try {
      let existUser = await this.prismaService.user.findUnique({
        where: { email: createUser.email.toLocaleLowerCase() },
      });
      if (existUser) {
        throw new ConflictException(
          `User with email ${createUser.email.toLocaleLowerCase()} already exist`,
        );
      }
      existUser = await this.prismaService.user.findUnique({
        where: { phone: createUser.phone.toLocaleLowerCase() },
      });
      if (existUser) {
        throw new ConflictException(
          `User with phone ${createUser.phone.toLocaleLowerCase()} already exist`,
        );
      }
      const user = await this.prismaService.user.create({ data: createUser });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findAll(where: UserFilter): Promise<ResponseUser[]> {
    try {
      return await this.prismaService.user.findMany({ where });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number): Promise<ResponseUser> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUser: UpdateUser): Promise<ResponseUser> {
    try {
      await this.findOne(id);
      return await this.prismaService.user.update({
        where: { id },
        data: updateUser,
      });
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<ResponseUser> {
    try {
      await this.findOne(id);
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (err) {
      throw err;
    }
  }
}
