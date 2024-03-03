import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ITaskService } from './interfaces/tasks.service';
import { ID } from 'src/common/types/type';
import { ICompanyService } from '../companies/interfaces/companies.service';
import { TaskNotFoundException } from './exception/tasks.exception';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('ITaskService') private readonly taskService: ITaskService,
    @Inject('ICompanyService')
    private readonly companyService: ICompanyService,
  ) {}

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    await this.companyService.findOneById(createTaskDto.company_id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      createTaskDto.company_id = currentUser.company_id;
    }

    createTaskDto.created_at = new Date();
    createTaskDto.created_by = currentUser.id;

    return await this.taskService.create(createTaskDto);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager, RoleEnum.worker)
  @Get('companyId/:id')
  async findAll(
    @Param('id', ParseIntPipe) companyId: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== RoleEnum.superAdmin) {
      companyId = currentUser.company_id;
    }

    return await this.taskService.findByCompanyId(companyId);
  }

  @auth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ID) {
    return await this.taskService.findOneById(id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    await this.taskService.findOneById(id);

    await this.companyService.findOneById(updateTaskDto.company_id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      updateTaskDto.company_id = currentUser.company_id;
    }

    updateTaskDto.last_updated_at = new Date();
    updateTaskDto.last_updated_by = currentUser.id;

    return await this.taskService.update(updateTaskDto, id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const foundUser = await this.taskService.findOneById(id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      if (foundUser.data.company_id == currentUser.company_id) {
        return this.taskService.delete(id);
      } else {
        throw new TaskNotFoundException();
      }
    }

    return await this.taskService.delete(id);
  }
}
