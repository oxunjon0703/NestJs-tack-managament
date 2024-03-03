import { ResponseData } from 'src/common/resData';
import { UserEntity } from '../entities/user.entity';
import { ID } from 'src/common/types/type';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserService {
  findAll(): Promise<ResponseData<Array<UserEntity>>>;
  findMyAll(id: ID): Promise<ResponseData<Array<UserEntity>>>;
  findOneById(id: ID): Promise<ResponseData<UserEntity>>;
  findOneByLogin(login: string): Promise<ResponseData<UserEntity | undefined>>;
  register(dto: CreateUserDto): Promise<ResponseData<UserEntity>>;
  updated(
    dto: UpdateUserDto,
    currentUser: UserEntity,
    id: ID,
  ): Promise<ResponseData<UserEntity>>;
  delete(id: ID): Promise<ResponseData<UserEntity>>;
}
