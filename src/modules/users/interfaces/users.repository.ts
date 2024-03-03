import { ID } from 'src/common/types/type';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<Array<UserEntity>>;
  findMyAll(id: ID): Promise<Array<UserEntity>>;
  findOneById(id: ID): Promise<UserEntity | undefined>;
  findOneByLogin(login: string): Promise<UserEntity | undefined>;
  insert(entity: UserEntity): Promise<UserEntity>;
  update(entity: UserEntity, id: ID): Promise<UserEntity>;
  delete(id: ID): Promise<UserEntity | undefined>;
}
