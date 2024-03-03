import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TaskService } from './tasks.service';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { CompanyService } from '../companies/companies.service';
import { CompanyRepository } from '../companies/companies.repository';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    {
      provide: 'ICompanyService',
      useClass: CompanyService,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class TasksModule {}
