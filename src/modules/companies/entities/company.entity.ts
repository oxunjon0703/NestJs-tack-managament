import { ID } from 'src/common/types/type';
import { CreateCompanyDto } from '../dto/create-company.dto';

export class CompanyEntity {
  id: ID;
  name: string;
  constructor(dto: CreateCompanyDto) {
    this.name = dto.name;
  }
}
