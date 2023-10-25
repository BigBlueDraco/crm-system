import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [CustomerController],
  providers: [CustomerService, UserService, PrismaService],
})
export class CustomerModule {}
