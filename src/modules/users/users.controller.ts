import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from './interfaces/users.service';
import { ID } from 'src/common/types/type';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from './entities/user.entity';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import {
  UserLoginAlreadyExistException,
  UserNotFoundException,
} from './exception/users.exception';
import { ICompanyService } from '../companies/interfaces/companies.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ICompanyService')
    private readonly companyService: ICompanyService,
  ) {}

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager, RoleEnum.worker)
  @Get('getMyAll/:id')
  async findAll(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== RoleEnum.superAdmin) {
      id = currentUser.company_id;

      return await this.userService.findMyAll(id);
    }

    return await this.userService.findAll();
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin, RoleEnum.manager, RoleEnum.worker)
  @Get('getOne/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== RoleEnum.superAdmin) {
      id = currentUser.id;
    }

    return await this.userService.findOneById(id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const checkLogin = await this.userService.findOneByLogin(
      updateUserDto.login,
    );

    if (checkLogin.data) {
      throw new UserLoginAlreadyExistException();
    }
    await this.companyService.findOneById(updateUserDto.company_id);

    await this.userService.findOneById(id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      updateUserDto.company_id = currentUser.company_id;
    }

    return await this.userService.updated(updateUserDto, currentUser, id);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: ID,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const foundUser = await this.userService.findOneById(id);

    if (currentUser.role !== RoleEnum.superAdmin) {
      if (foundUser.data.company_id == currentUser.company_id) {
        return this.userService.delete(id);
      } else {
        throw new UserNotFoundException();
      }
    }
    return this.userService.delete(id);
  }
}
