import { Module } from '@nestjs/common';
import { RightOnRoleService } from './right-on-role.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [RightOnRoleService, PrismaService],
  exports: [RightOnRoleService],
})
export class RightOnRoleModule {}
