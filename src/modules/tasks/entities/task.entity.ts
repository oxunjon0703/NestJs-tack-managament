import { ID } from 'src/common/types/type';
import { CreateTaskDto } from './../dto/create-task.dto';

export class TaskEntity {
  title: string;
  description: string;
  company_id: ID;
  parent_id: ID;
  day: number;
  created_at: Date;
  last_updated_at: Date;
  created_by: number;
  last_updated_by: number;
  constructor(dto: CreateTaskDto) {
    this.title = dto.title;
    this.description = dto.description;
    this.company_id = dto.company_id;
    this.parent_id = dto.parent_id;
    this.day = dto.day;
    this.created_at = dto.created_at;
    this.last_updated_at = dto.last_updated_at;
    this.created_by = dto.created_by;
    this.last_updated_by = dto.last_updated_by;
  }
}
