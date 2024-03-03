import { ID } from 'src/common/types/type';
import { UserTaskEntity } from '../entities/user-task.entity';
import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';
import { ResponseData } from 'src/common/resData';

export interface IUserTasksService {
  findOneByUserId(user_id: ID): Promise<ResponseData<UserTaskEntity[]>>;
  findOneByTaskId(task_id: ID): Promise<ResponseData<UserTaskEntity[]>>;
  findOneById(id: ID): Promise<ResponseData<UserTaskEntity | undefined>>;
  create(dto: CreateUserTaskDto): Promise<ResponseData<UserTaskEntity>>;
  update(dto: UpdateUserTaskDto, id: ID): Promise<ResponseData<UserTaskEntity>>;
  delete(id: ID): Promise<ResponseData<UserTaskEntity>>;
}
