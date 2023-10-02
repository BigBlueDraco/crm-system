import { Right } from '@prisma/client';
import { Role } from './role';

export interface ResponseRole extends Role {
  id: number;
  rights: Right[];
}
