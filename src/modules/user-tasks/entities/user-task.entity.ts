import { StatusEnum } from 'src/common/enums/enum';
import { ID } from 'src/common/types/type';
import { CreateUserTaskDto } from '../dto/create-user-task.dto';

export class UserTaskEntity {
  user_id: ID;
  task_id: ID;
  start_at: Date;
  end_at: Date;
  status: StatusEnum;
  started_date: Date;
  ended_date: Date;
  created_at: Date;
  last_updated_at: Date;
  created_by: ID;
  last_updated_by: ID;
  constructor(dto: CreateUserTaskDto) {
    this.user_id = dto.user_id;
    this.task_id = dto.task_id;
    this.start_at = dto.start_at;
    this.end_at = dto.end_at;
    this.started_date = dto.started_date;
    this.ended_date = dto.ended_date;
    this.status = dto.status;
    this.created_at = dto.created_at;
    this.last_updated_at = dto.last_updated_at;
    this.created_by = dto.created_by;
    this.last_updated_by = dto.last_updated_by;
  }
}
