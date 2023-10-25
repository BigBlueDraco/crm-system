import { Right } from 'src/rights/types/Right';
import { Role } from './role';

export interface ResponseRole extends Role {
  id: number;
  rights: Right[];
}
