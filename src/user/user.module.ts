import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, PrismaService],
})
export class UserModule {}
