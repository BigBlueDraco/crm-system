import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/service/prisma.service';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, PrismaModule, EmployeeModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
