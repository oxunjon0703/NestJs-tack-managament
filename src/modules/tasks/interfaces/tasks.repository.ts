import { ID } from 'src/common/types/type';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskRepository {
  findByCompanyId(companyId: ID): Promise<Array<TaskEntity>>;
  findOneById(id: ID): Promise<TaskEntity | undefined>;
  insert(entity: TaskEntity): Promise<TaskEntity>;
  update(entity: TaskEntity, id: ID): Promise<TaskEntity>;
  delete(id: ID): Promise<TaskEntity>;
  deleteMyCompany(id: ID): Promise<TaskEntity>;
}
