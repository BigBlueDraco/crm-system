import { Right } from '../types/response-role';

export class RightDto implements Right {
  name: string;
  isEnable: boolean;
}
