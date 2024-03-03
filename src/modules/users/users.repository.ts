import { Injectable } from '@nestjs/common';
import { Postgres } from '../../lib/pg';
import { UserEntity } from './entities/User.entity';
import { IUserRepository } from './interfaces/users.repository';
import { ID } from 'src/common/types/type';

@Injectable()
export class UserRepository extends Postgres implements IUserRepository {
  async findAll(): Promise<Array<UserEntity>> {
    return await this.fetchAll<UserEntity>(`select * from users`);
  }

  async findMyAll(id: ID): Promise<Array<UserEntity>> {
    return await this.fetchAll<UserEntity, ID>(
      `select * from users where company_id = $1`,
      id,
    );
  }

  async findOneById(id: ID): Promise<UserEntity> {
    return await this.fetch<UserEntity, ID>(
      'select * from users where id = $1',
      id,
    );
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    return await this.fetch<UserEntity, string>(
      'select * from users where login = $1',
      login,
    );
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number | any>(
      `insert into users(login, password, full_name, company_id, role, created_at, created_by) values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      entity.login,
      entity.password,
      entity.full_name,
      entity.company_id,
      entity.role,
      entity.created_at,
      entity.created_by,
    );
  }

  async update(entity: UserEntity, id: ID): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number | any>(
      'update users set login = $2, password = $3, full_name = $4, company_id = $5, role = $6, last_updated_at = $7, last_updated_by = $8 where id = $1 returning *',
      id,
      entity.login,
      entity.password,
      entity.full_name,
      entity.company_id,
      entity.role,
      entity.last_updated_at,
      entity.last_updated_by,
    );
  }

  async delete(id: ID): Promise<UserEntity> {
    return await this.fetch(`delete from users where id = $1`, id);
  }
}
