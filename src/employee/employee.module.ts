import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, UserService, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
