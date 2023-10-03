import { ResponseRole } from '../types/response-role';
import { RightDto } from '../../rights/dto/right.dto';

export class ResponseRoleDto implements ResponseRole {
  id: number;
  rights: RightDto[];
  name: string;
}
