import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmployeeModule } from '../employee/employee.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/service/prisma.service';
import { EmployeeService } from '../employee/employee.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule, EmployeeModule, UserModule],
  controllers: [EventsController],
  providers: [EventsService, PrismaService, EmployeeService, UserService],
})
export class EventsModule {}
