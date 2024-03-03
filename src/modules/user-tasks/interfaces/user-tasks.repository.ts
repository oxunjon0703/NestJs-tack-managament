import { ID } from 'src/common/types/type';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTasksRepository {
  findOneByUserId(user_id: ID): Promise<Array<UserTaskEntity | undefined>>;
  findOneByTaskId(task_id: ID): Promise<Array<UserTaskEntity | undefined>>;
  findOneById(id: ID): Promise<UserTaskEntity | undefined>;
  insert(entity: UserTaskEntity): Promise<UserTaskEntity>;
  update(entity: UserTaskEntity, id: ID): Promise<UserTaskEntity>;
  delete(id: ID): Promise<void>;
}
