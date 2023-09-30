import { Role } from './role';

export interface ResponseRole extends Role {
  id: number;
  rights: Right[];
}

export interface Right {
  name: string;
}
