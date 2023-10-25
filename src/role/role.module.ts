import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RightOnRoleModule } from 'src/right-on-role/right-on-role.module';
import { RightsModule } from 'src/rights/rights.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RightsService } from 'src/rights/rights.service';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Module({
  imports: [RightOnRoleModule, RightsModule, PrismaModule],
  controllers: [RoleController],
  providers: [RoleService, RightsService, RightOnRoleModule, PrismaService],
})
export class RoleModule {}
