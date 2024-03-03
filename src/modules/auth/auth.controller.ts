import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.login.dto';
import { RegisterDto } from './dto/auth.register.dto';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { ICompanyService } from '../companies/interfaces/companies.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('ICompanyService')
    private readonly companyService: ICompanyService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Auth(RoleEnum.superAdmin, RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role !== RoleEnum.superAdmin) {
      registerDto.company_id = currentUser.company_id;
    }
    await this.companyService.findOneById(registerDto.company_id);

    return await this.authService.register(registerDto, currentUser);
  }
}
