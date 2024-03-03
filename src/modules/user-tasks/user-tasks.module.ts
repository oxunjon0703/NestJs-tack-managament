import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { UserTasksRepository } from './user-tasks.repository';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { TaskService } from '../tasks/tasks.service';
import { TaskRepository } from '../tasks/tasks.repository';

@Module({
  controllers: [UserTasksController],
  providers: [
    {
      provide: 'IUserTasksService',
      useClass: UserTasksService,
    },
    {
      provide: 'IUserTasksRepository',
      useClass: UserTasksRepository,
    },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
})
export class UserTasksModule {}
