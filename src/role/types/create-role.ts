import { Role } from './role';

export interface CreateRole extends Role {
  rightsIds: number[];
  name: string;
}
