import { Right } from '@/rights/types/Right';

export class RightDto implements Right {
  id: number;
  name: string;
  isEnable: boolean;
}
