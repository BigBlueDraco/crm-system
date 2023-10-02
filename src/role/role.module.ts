import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RightOnRoleModule } from '@/right-to-role/right-on-role.module';
import { RightsModule } from '@/rights/rights.module';
import { RightsService } from '@/rights/rights.service';

@Module({
  imports: [RightOnRoleModule, RightsModule],
  controllers: [RoleController],
  providers: [RoleService, RightsService, RightOnRoleModule],
})
export class RoleModule {}
