import { Role } from './role';

export interface UpdateRole extends Role {
  addRights: number[];
  removeRights: number[];
}
