import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [RightsService, PrismaService],
  exports: [RightsService],
})
export class RightsModule {}
