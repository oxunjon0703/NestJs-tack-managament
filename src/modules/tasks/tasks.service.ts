import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITaskService } from './interfaces/tasks.service';
import { TaskEntity } from './entities/task.entity';
import { ITaskRepository } from './interfaces/tasks.repository';
import { ResponseData } from 'src/common/resData';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ID } from 'src/common/types/type';
import { TaskNotFoundException } from './exception/tasks.exception';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
  ) {}

  async findByCompanyId(
    companyId: ID,
  ): Promise<ResponseData<Array<TaskEntity>>> {
    const tasks = await this.taskRepository.findByCompanyId(companyId);

    if (!tasks) {
      throw new TaskNotFoundException();
    }

    return new ResponseData<Array<TaskEntity>>(
      'Get by company id tasks',
      200,
      tasks,
    );
  }

  async findOneById(id: ID): Promise<ResponseData<TaskEntity | undefined>> {
    const foundTask = await this.taskRepository.findOneById(id);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    return new ResponseData<TaskEntity>('get by id task', 200, foundTask);
  }

  async create(dto: CreateTaskDto): Promise<ResponseData<TaskEntity>> {
    const taskEntity = new TaskEntity(dto);

    const newTask = await this.taskRepository.insert(taskEntity);

    return new ResponseData<TaskEntity>('created', 201, newTask);
  }

  async update(dto: UpdateTaskDto, id: ID): Promise<ResponseData<TaskEntity>> {
    const taskEntity = new TaskEntity(dto);

    const updateTask = await this.taskRepository.update(taskEntity, id);

    return new ResponseData<TaskEntity>('updated', 201, updateTask);
  }

  async delete(id: ID): Promise<ResponseData<TaskEntity>> {
    const foundTask = await this.taskRepository.findOneById(id);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    await this.taskRepository.delete(id);

    return new ResponseData<TaskEntity>('deleted', 201, foundTask);
  }

  async deleteMyCompany(id: ID): Promise<ResponseData<TaskEntity>> {
    const foundTask = await this.taskRepository.findOneById(id);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    await this.taskRepository.deleteMyCompany(id);

    return new ResponseData<TaskEntity>('deleted', 201, foundTask);
  }
}
