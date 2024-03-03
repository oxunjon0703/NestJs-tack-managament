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
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { ICompanyService } from './interfaces/companies.service';
import { CompanyAlreadyExistException } from './exception/companies.exception';
import { ID } from 'src/common/types/type';
import { Auth, auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    @Inject('ICompanyService')
    private readonly companyService: ICompanyService,
  ) {}

  @Auth(RoleEnum.superAdmin)
  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @auth()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== RoleEnum.superAdmin) {
      return await this.companyService.findOneMyId(currentUser.company_id);
    }
    return await this.companyService.findOneById(id);
  }

  @Auth(RoleEnum.superAdmin)
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const checkName = await this.companyService.findOneByName(
      createCompanyDto.name,
    );

    if (checkName.data) {
      throw new CompanyAlreadyExistException();
    }

    return await this.companyService.create(createCompanyDto);
  }

  @Auth(RoleEnum.superAdmin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const checkName = await this.companyService.findOneByName(
      updateCompanyDto.name,
    );

    if (checkName.data) {
      throw new CompanyAlreadyExistException();
    }

    return await this.companyService.update(updateCompanyDto, id);
  }

  @Auth(RoleEnum.superAdmin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: ID) {
    return await this.companyService.delete(id);
  }
}
