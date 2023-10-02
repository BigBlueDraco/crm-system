import { ResponseRole } from '../types/response-role';
import { RightDto } from './right.dto';

export class ResponseRoleDto implements ResponseRole {
  id: number;
  rights: RightDto[];
  name: string;
}
