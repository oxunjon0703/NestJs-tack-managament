import { UserEntity } from 'src/modules/users/entities/user.entity';
import { LoginDto } from '../dto/auth.login.dto';
import { RegisterDto } from '../dto/auth.register.dto';
import { ResponseData } from 'src/common/resData';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IRegisterData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(dto: LoginDto): Promise<ResponseData<ILoginData>>;
  register(
    entity: RegisterDto,
    currenUser: UserEntity,
  ): Promise<ResponseData<IRegisterData>>;
}
