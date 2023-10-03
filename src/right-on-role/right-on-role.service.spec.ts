import { Test, TestingModule } from '@nestjs/testing';
import { RightOnRoleService } from './right-on-role.service';

describe('RightToRoleService', () => {
  let service: RightOnRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RightOnRoleService],
    }).compile();

    service = module.get<RightOnRoleService>(RightOnRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
