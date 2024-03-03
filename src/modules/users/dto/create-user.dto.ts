import { RoleEnum } from 'src/common/enums/enum';

export class CreateUserDto {
  login: string;
  password: string;
  full_name: string;
  company_id: number;
  role: RoleEnum;
  created_at: Date;
  last_updated_at: Date;
  created_by: number;
  last_updated_by: number;
}
