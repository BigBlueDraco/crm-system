import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';
import { PrismaService } from '@/prisma/service/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RightsService, PrismaService],
  exports: [RightsService],
})
export class RightsModule {}
