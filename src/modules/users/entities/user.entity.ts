import { RoleEnum } from 'src/common/enums/enum';
import { ID } from 'src/common/types/type';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserEntity {
  id: ID;
  login: string;
  password: string;
  full_name: string;
  company_id: number;
  role: RoleEnum;
  created_at: Date;
  last_updated_at: Date;
  created_by: number;
  last_updated_by: number;
  constructor(dto: CreateUserDto) {
    this.login = dto.login;
    this.password = dto.password;
    this.full_name = dto.full_name;
    this.company_id = dto.company_id;
    this.role = dto.role;
    this.created_at = dto.created_at;
    this.last_updated_at = dto.last_updated_at;
    this.created_by = dto.created_by;
    this.last_updated_by = dto.last_updated_by;
  }
}
