import { ResponseData } from 'src/common/resData';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from '../entities/company.entity';
import { ID } from 'src/common/types/type';

export interface ICompanyService {
  findAll(): Promise<ResponseData<Array<CompanyEntity>>>;
  findOneById(id: ID): Promise<ResponseData<CompanyEntity | undefined>>;
  findOneMyId(id: ID): Promise<ResponseData<CompanyEntity | undefined>>;
  findOneByName(name: string): Promise<ResponseData<CompanyEntity | undefined>>;
  create(dto: CreateCompanyDto): Promise<ResponseData<CompanyEntity>>;
  update(dto: CreateCompanyDto, id: ID): Promise<ResponseData<CompanyEntity>>;
  delete(id: ID): Promise<ResponseData<CompanyEntity>>;
}
