import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { IUserTasksService } from './interfaces/user-tasks.service';
import { ResponseData } from 'src/common/resData';
import { UserTaskEntity } from './entities/user-task.entity';
import { ID } from 'src/common/types/type';
import { IUserTasksRepository } from './interfaces/user-tasks.repository';
import { UserTasksNotFoundException } from './exception/user-tasks.exception';

@Injectable()
export class UserTasksService implements IUserTasksService {
  constructor(
    @Inject('IUserTasksRepository')
    private readonly userTasksRepository: IUserTasksRepository,
  ) {}

  async findOneByUserId(user_id: ID): Promise<ResponseData<UserTaskEntity[]>> {
    const foundUserTask =
      await this.userTasksRepository.findOneByUserId(user_id);

    if (!foundUserTask) {
      throw new UserTasksNotFoundException();
    }

    return new ResponseData('get by userId user-task', 200, foundUserTask);
  }

  async findOneByTaskId(task_id: ID): Promise<ResponseData<UserTaskEntity[]>> {
    const foundUserTask =
      await this.userTasksRepository.findOneByTaskId(task_id);

    if (!foundUserTask) {
      throw new UserTasksNotFoundException();
    }

    return new ResponseData<UserTaskEntity[]>(
      'get by task_id user-task',
      200,
      foundUserTask,
    );
  }

  async findOneById(id: ID): Promise<ResponseData<UserTaskEntity | undefined>> {
    const foundUserTask = await this.userTasksRepository.findOneById(id);

    if (!foundUserTask) {
      throw new UserTasksNotFoundException();
    }

    return new ResponseData('get by id user-task', 200, foundUserTask);
  }

  async create(dto: CreateUserTaskDto): Promise<ResponseData<UserTaskEntity>> {
    const userTaskEntity = new UserTaskEntity(dto);

    const newUserTask = await this.userTasksRepository.insert(userTaskEntity);

    return new ResponseData('success', 201, newUserTask);
  }

  async update(
    dto: UpdateUserTaskDto,
    id: ID,
  ): Promise<ResponseData<UserTaskEntity>> {
    const userTaskEntity = new UserTaskEntity(dto);

    const UpdateUserTask = await this.userTasksRepository.update(
      userTaskEntity,
      id,
    );

    return new ResponseData('updated', 201, UpdateUserTask);
  }

  async delete(id: ID): Promise<ResponseData<UserTaskEntity>> {
    const foundUserTask = await this.userTasksRepository.findOneById(id);

    if (!foundUserTask) {
      throw new UserTasksNotFoundException();
    }

    await this.userTasksRepository.delete(id);

    return new ResponseData('deleted', 204, foundUserTask);
  }

  findAll() {
    return `This action returns all userTasks`;
  }
}
