import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';

export interface ICompanyRepository {
  findAll(): Promise<Array<CompanyEntity>>;
  findOneById(id: ID): Promise<CompanyEntity | undefined>;
  findOneMyId(id: ID): Promise<CompanyEntity | undefined>;
  findOneByName(name: string): Promise<CompanyEntity | undefined>;
  insert(entity: CompanyEntity): Promise<CompanyEntity>;
  update(entity: CompanyEntity, id: ID): Promise<CompanyEntity>;
  delete(id: ID): Promise<CompanyEntity>;
}
