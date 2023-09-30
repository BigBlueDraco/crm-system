import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from './types/CreateUser';
import { UserFilter } from './types/UserFilter';
import { UpdateUser } from './types/UpdateUser';
import { PrismaService } from '@/prisma/service/prisma.service';
import { ResponseUser } from './types/ResponseUser';

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
      return await this.prismaService.user.create({ data: createUser });
    } catch (err) {
      return err;
    }
  }

  async findAll(where: UserFilter): Promise<ResponseUser[]> {
    try {
      return await this.prismaService.user.findMany({ where });
    } catch (err) {
      return err;
    }
  }

  async findOne(id: number): Promise<ResponseUser> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} dosen't exist`);
      }
      return user;
    } catch (err) {
      return err;
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
      return err;
    }
  }

  async remove(id: number): Promise<ResponseUser> {
    try {
      await this.findOne(id);
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (err) {
      return err;
    }
  }
}
