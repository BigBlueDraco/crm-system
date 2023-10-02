import { Module } from '@nestjs/common';
import { RightOnRoleService } from './right-on-role.service';

@Module({
  providers: [RightOnRoleService],
  exports: [RightOnRoleService],
})
export class RightOnRoleModule {}
