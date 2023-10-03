import { PrismaService } from '@/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RightOnRoleService {
  constructor(private readonly prismaService: PrismaService) {}
  async createMany(rightsToCreate) {
    return await this.prismaService.rightOnRole.createMany({
      data: [...rightsToCreate],
    });
  }
  async removeMany(rightsToRemove: { roleIds: number[]; rightsIds: number[] }) {
    return await this.prismaService.rightOnRole.deleteMany({
      where: {
        roleId: { in: rightsToRemove.roleIds },
        rightId: { in: rightsToRemove.rightsIds },
      },
    });
  }
}
