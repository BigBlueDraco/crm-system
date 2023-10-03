import { Module } from '@nestjs/common';
import { RightOnRoleService } from './right-on-role.service';
import { PrismaService } from '@/prisma/service/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RightOnRoleService, PrismaService],
  exports: [RightOnRoleService],
})
export class RightOnRoleModule {}
