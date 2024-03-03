import { Inject, Injectable } from '@nestjs/common';
import { ICompanyService } from './interfaces/companies.service';
import { ResponseData } from 'src/common/resData';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { ICompanyRepository } from './interfaces/companies.repository';
import { ID } from 'src/common/types/type';
import { CompanyNotFoundException } from './exception/companies.exception';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async findOneById(id: ID): Promise<ResponseData<CompanyEntity>> {
    const company = await this.companyRepository.findOneById(id);

    if (!company) {
      throw new CompanyNotFoundException();
    }

    return new ResponseData('Get by id company', 200, company);
  }

  async findOneMyId(id: ID): Promise<ResponseData<CompanyEntity>> {
    const company = await this.companyRepository.findOneMyId(id);

    if (!company) {
      throw new CompanyNotFoundException();
    }

    return new ResponseData('Get my id company', 200, company);
  }

  async findAll(): Promise<ResponseData<Array<CompanyEntity>>> {
    const company = await this.companyRepository.findAll();

    return new ResponseData('Get all companies', 200, company);
  }

  async findOneByName(name: string): Promise<ResponseData<CompanyEntity>> {
    const checkName = await this.companyRepository.findOneByName(name);

    return new ResponseData('success', 200, checkName);
  }

  async create(dto: CreateCompanyDto): Promise<ResponseData<CompanyEntity>> {
    const newCompanyEntity = new CompanyEntity(dto);

    const newCompany = await this.companyRepository.insert(newCompanyEntity);

    return new ResponseData('success', 201, newCompany);
  }

  async update(
    dto: CreateCompanyDto,
    id: ID,
  ): Promise<ResponseData<CompanyEntity>> {
    const company = await this.companyRepository.findOneById(id);

    if (!company) {
      throw new CompanyNotFoundException();
    }

    const UpdateCompanyEntity = new CompanyEntity(dto);

    const companyEntity = await this.companyRepository.update(
      UpdateCompanyEntity,
      id,
    );

    return new ResponseData('updated', 201, companyEntity);
  }

  async delete(id: ID): Promise<ResponseData<CompanyEntity>> {
    const company = await this.companyRepository.findOneById(id);

    if (!company) {
      throw new CompanyNotFoundException();
    }

    await this.companyRepository.delete(id);

    return new ResponseData('deleted', 201, company);
  }
}
