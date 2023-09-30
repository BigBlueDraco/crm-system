import { UpdateRole } from '../types/update-role';

export class UpdateRoleDto implements UpdateRole {
  addRights: number[];
  removeRights: number[];
  name: string;
}
