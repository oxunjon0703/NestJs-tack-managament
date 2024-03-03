import { ResponseData } from 'src/common/resData';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ID } from 'src/common/types/type';

export interface ITaskService {
  findByCompanyId(companyId: ID): Promise<ResponseData<Array<TaskEntity>>>;
  findOneById(id: ID): Promise<ResponseData<TaskEntity | undefined>>;
  create(dto: CreateTaskDto): Promise<ResponseData<TaskEntity>>;
  update(dto: UpdateTaskDto, id: ID): Promise<ResponseData<TaskEntity>>;
  delete(id: ID): Promise<ResponseData<TaskEntity>>;
  deleteMyCompany(id: ID): Promise<ResponseData<TaskEntity>>;
}
