import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUserTasksService } from './interfaces/user-tasks.service';
import { ID } from 'src/common/types/type';
import { Auth, auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { IUserService } from '../users/interfaces/users.service';
import { ITaskService } from '../tasks/interfaces/tasks.service';
import { UserNotFoundException } from '../users/exception/users.exception';
import { UserTasksNotFoundException } from './exception/user-tasks.exception';

@ApiTags('user-tasks')
@Controller('user-tasks')
export class UserTasksController {
  constructor(
    @Inject('IUserTasksService')
    private readonly userTasksService: IUserTasksService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITaskService') private readonly taskService: ITaskService,
  ) {}

  @Post()
  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager)
  async create(
    @Body() createUserTaskDto: CreateUserTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const checkUser = await this.userService.findOneById(
      createUserTaskDto.user_id,
    );
    if (currentUser.role !== RoleEnum.superAdmin) {
      if (currentUser.company_id == checkUser.data.company_id) {
        await this.taskService.findOneById(createUserTaskDto.task_id);

        createUserTaskDto.created_at = new Date();
        createUserTaskDto.created_by = currentUser.id;

        return await this.userTasksService.create(createUserTaskDto);
      } else {
        throw new UserNotFoundException();
      }
    }

    await this.taskService.findOneById(createUserTaskDto.task_id);

    createUserTaskDto.created_at = new Date();
    createUserTaskDto.created_by = currentUser.id;

    return await this.userTasksService.create(createUserTaskDto);
  }

  @auth()
  @Get('TaskId/:id')
  async findTaskId(@Param('id', ParseIntPipe) task_id: ID) {
    return await this.userTasksService.findOneByTaskId(task_id);
  }

  @auth()
  @Get('UserId/:id')
  async findUserId(@Param('id', ParseIntPipe) user_id: ID) {
    return await this.userTasksService.findOneByUserId(user_id);
  }

  @auth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ID) {
    return await this.userTasksService.findOneById(id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateUserTaskDto: UpdateUserTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    await this.userTasksService.findOneById(id);

    const checkUser = await this.userService.findOneById(
      updateUserTaskDto.user_id,
    );
    if (currentUser.role !== RoleEnum.superAdmin) {
      if (currentUser.company_id == checkUser.data.company_id) {
        await this.taskService.findOneById(updateUserTaskDto.task_id);

        updateUserTaskDto.last_updated_at = new Date();
        updateUserTaskDto.last_updated_by = currentUser.id;

        return await this.userTasksService.update(updateUserTaskDto, id);
      } else {
        throw new UserNotFoundException();
      }
    }

    await this.taskService.findOneById(updateUserTaskDto.task_id);

    updateUserTaskDto.last_updated_at = new Date();
    updateUserTaskDto.last_updated_by = currentUser.id;
    return await this.userTasksService.update(updateUserTaskDto, id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const checkUserTask = await this.userTasksService.findOneById(id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      const checkUser = await this.userService.findOneById(
        checkUserTask.data.user_id,
      );
      if (checkUser.data.company_id == currentUser.company_id) {
        return this.userTasksService.delete(id);
      } else {
        throw new UserTasksNotFoundException();
      }
    }
    return this.userTasksService.delete(id);
  }
}
