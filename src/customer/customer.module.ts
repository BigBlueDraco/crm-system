import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [CustomerController],
  providers: [CustomerService, UserService, PrismaService],
})
export class CustomerModule {}
