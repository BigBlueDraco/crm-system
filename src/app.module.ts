import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { RightsModule } from './rights/rights.module';
import { RightOnRoleModule } from './right-to-role/right-on-role.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    EmployeeModule,
    RoleModule,
    RightsModule,
    RightOnRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
