import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RightOnRoleModule } from '@/right-on-role/right-on-role.module';
import { RightsModule } from '@/rights/rights.module';
import { RightsService } from '@/rights/rights.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/service/prisma.service';

@Module({
  imports: [RightOnRoleModule, RightsModule, PrismaModule],
  controllers: [RoleController],
  providers: [RoleService, RightsService, RightOnRoleModule, PrismaService],
})
export class RoleModule {}
