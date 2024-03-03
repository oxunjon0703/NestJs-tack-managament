import { Injectable } from '@nestjs/common';
import { Postgres } from '../../lib/pg';
import { ITaskRepository } from './interfaces/tasks.repository';
import { TaskEntity } from './entities/task.entity';
import { ID } from 'src/common/types/type';

@Injectable()
export class TaskRepository extends Postgres implements ITaskRepository {
  async findByCompanyId(companyId: ID): Promise<Array<TaskEntity>> {
    return await this.fetchAll<TaskEntity, ID>(
      `select * from tasks where company_id = $1`,
      companyId,
    );
  }

  async findOneById(id: ID): Promise<TaskEntity> {
    return await this.fetch(`select * from tasks where id = $1`, id);
  }

  async insert(entity: TaskEntity): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date>(
      'insert into tasks(title, description, company_id, parent_id, day, created_at, created_by) values ($1, $2, $3, $4, $5, $6, $7) returning *',
      entity.title,
      entity.description,
      entity.company_id,
      entity.parent_id,
      entity.day,
      entity.created_at,
      entity.created_by,
    );
  }

  async update(entity: TaskEntity, id: number): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date>(
      'update tasks set title = $1, description = $2, company_id = $3, parent_id = $4, day = $5, last_updated_at = $6, last_updated_by = $7 where id = $8 returning *',
      entity.title,
      entity.description,
      entity.company_id,
      entity.parent_id,
      entity.day,
      entity.last_updated_at,
      entity.last_updated_by,
      id,
    );
  }

  async delete(id: ID): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, ID>(
      `delete from tasks where id = $1`,
      id,
    );
  }

  async deleteMyCompany(id: ID): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, ID>(
      `delete from tasks where company_id = $1`,
      id,
    );
  }
}
