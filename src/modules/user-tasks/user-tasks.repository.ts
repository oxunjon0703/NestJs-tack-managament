import { Injectable } from '@nestjs/common';
import { Postgres } from '../../lib/pg';
import { IUserTasksRepository } from './interfaces/user-tasks.repository';
import { UserTaskEntity } from './entities/user-task.entity';
import { ID } from 'src/common/types/type';
import { StatusEnum } from 'src/common/enums/enum';

@Injectable()
export class UserTasksRepository
  extends Postgres
  implements IUserTasksRepository
{
  async findOneByUserId(
    user_id: ID,
  ): Promise<Array<UserTaskEntity | undefined>> {
    return await this.fetchAll(
      `select * from user_tasks where user_id = $1`,
      user_id,
    );
  }

  async findOneByTaskId(
    task_id: ID,
  ): Promise<Array<UserTaskEntity | undefined>> {
    return await this.fetchAll(
      `select * from user_tasks where task_id = $1`,
      task_id,
    );
  }

  async findOneById(id: ID): Promise<UserTaskEntity> {
    return await this.fetch(`select * from user_tasks where id = $1`, id);
  }

  async insert(entity: UserTaskEntity): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number | Date | ID | StatusEnum>(
      'insert into user_tasks(user_id, task_id, start_at, end_at, started_date, ended_date, status, created_at, created_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
      entity.user_id,
      entity.task_id,
      entity.start_at,
      entity.end_at,
      entity.started_date,
      entity.ended_date,
      entity.status,
      entity.created_at,
      entity.created_by,
    );
  }
  async update(entity: UserTaskEntity, id: ID): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, number | Date | ID | StatusEnum>(
      'update user_tasks set user_id = $1, task_id = $2, start_at = $3, end_at = $4, started_date = $5, ended_date = $6, status = $7, last_updated_at = $8, last_updated_by = $9 where id = $10 returning *',
      entity.user_id,
      entity.task_id,
      entity.start_at,
      entity.end_at,
      entity.started_date,
      entity.ended_date,
      entity.status,
      entity.last_updated_at,
      entity.last_updated_by,
      id,
    );
  }

  async delete(id: ID): Promise<void> {
    return await this.fetch(`delete from user_tasks where id = $1`, id);
  }
}
