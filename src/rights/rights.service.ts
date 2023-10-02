import { PrismaService } from '@/prisma/service/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class RightsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyById(idList: number[]) {
    try {
      return await this.prismaService.right.findMany({
        where: { id: { in: [...idList] } },
      });
    } catch (err) {
      return err;
    }
  }
  async findOne(id: number) {
    return await this.prismaService.right.findFirst({ where: { id } });
  }
  async checkRightsExistInDB(idList: number[]) {
    const existingRights = await this.findManyById(idList);
    if (existingRights.length !== idList.length) {
      throw new ConflictException(
        `Rights ids (${idList}) dosent math to existing rights ids (${existingRights}) in database`,
      );
    }
  }
}
