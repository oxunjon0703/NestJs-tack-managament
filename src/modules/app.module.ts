import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { TasksModule } from './tasks/tasks.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompaniesModule,
    TasksModule,
    UserTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
