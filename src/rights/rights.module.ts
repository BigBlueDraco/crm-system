import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';

@Module({
  providers: [RightsService],
  exports: [RightsService],
})
export class RightsModule {}
