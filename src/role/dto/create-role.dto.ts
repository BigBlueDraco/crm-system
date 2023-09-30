import { CreateRole } from '../types/create-role';

export class CreateRoleDto implements CreateRole {
  rightsIds: number[];
  name: string;
}
