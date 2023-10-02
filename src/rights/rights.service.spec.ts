import { Test, TestingModule } from '@nestjs/testing';
import { RightsService } from './rights.service';

describe('RightsService', () => {
  let service: RightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RightsService],
    }).compile();

    service = module.get<RightsService>(RightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
