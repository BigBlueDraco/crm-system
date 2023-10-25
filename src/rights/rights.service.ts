import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class RightsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyById(idList: number[]) {
    try {
      return await this.prismaService.right.findMany({
        where: { id: { in: [...idList] } },
      });
    } catch (err) {
      throw err;
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
