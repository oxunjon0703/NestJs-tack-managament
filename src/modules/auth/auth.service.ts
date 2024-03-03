import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IAuthService,
  ILoginData,
  IRegisterData,
} from './interfaces/auth.service';
import { ResponseData } from '../../common/resData';
import { LoginDto } from './dto/auth.login.dto';
import {
  LoginOrPasswordWrongException,
  LoginUserSuchException,
} from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/auth.register.dto';
import { IUserService } from '../users/interfaces/users.service';
import { compar, hashed } from 'src/lib/bcrypt';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async register(
    entity: RegisterDto,
    currentUser: UserEntity,
  ): Promise<ResponseData<IRegisterData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      entity.login,
    );

    if (foundUser) {
      throw new LoginUserSuchException();
    }

    if (currentUser) {
      entity.created_by = currentUser.id;
    }

    const hashData = await hashed(entity.password);

    entity.password = hashData;

    const { data: newUser } = await this.userService.register(entity);

    const token = await this.jwtService.signAsync({ id: newUser.id });

    return new ResponseData<ILoginData>('success', HttpStatus.OK, {
      user: newUser,
      token,
    });
  }

  async login(dto: LoginDto): Promise<ResponseData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }

    const checkPasswor = await compar(dto.password, foundUser.password);

    if (!checkPasswor) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResponseData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }
}
