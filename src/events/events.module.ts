import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule, EmployeeModule, UserModule],
  controllers: [EventsController],
  providers: [EventsService, PrismaService, EmployeeService, UserService],
})
export class EventsModule {}
