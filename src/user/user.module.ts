import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/service/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, PrismaService],
})
export class UserModule {}
