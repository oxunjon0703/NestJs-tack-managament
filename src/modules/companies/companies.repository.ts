import { Postgres } from 'src/lib/pg';
import { CompanyEntity } from './entities/company.entity';
import { ICompanyRepository } from './interfaces/companies.repository';
import { ID } from 'src/common/types/type';

export class CompanyRepository extends Postgres implements ICompanyRepository {
  async findAll(): Promise<Array<CompanyEntity>> {
    return await this.fetchAll<CompanyEntity>('select * from companies');
  }

  async findOneById(id: ID): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, ID>(
      'select * from companies where id = $1',
      id,
    );
  }

  async findOneMyId(id: ID): Promise<CompanyEntity | undefined> {
    return await this.fetch<CompanyEntity, ID>(
      'select * from companies where id = $1',
      id,
    );
  }

  async findOneByName(name: string): Promise<CompanyEntity | undefined> {
    return await this.fetch<CompanyEntity, string>(
      'select * from companies where name = $1',
      name,
    );
  }

  async insert(entity: CompanyEntity): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string>(
      'insert into companies(name) values ($1) returning *',
      entity.name,
    );
  }

  async update(entity: CompanyEntity, id: ID): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string | ID>(
      'update companies set name = $1 where id = $2 returning *',
      entity.name,
      id,
    );
  }

  async delete(id: ID): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, ID>(
      'delete  from companies where id = $1',
      id,
    );
  }
}
