import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompanyRepository } from './companies.repository';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';

@Module({
  controllers: [CompaniesController],
  providers: [
    {
      provide: 'ICompanyService',
      useClass: CompanyService,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class CompaniesModule {}
