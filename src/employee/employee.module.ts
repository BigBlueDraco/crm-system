import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, UserService, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
