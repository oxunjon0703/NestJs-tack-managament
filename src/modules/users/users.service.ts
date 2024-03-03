import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/users.repository';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/users.service';
import { ResponseData } from 'src/common/resData';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/users.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashed } from 'src/lib/bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<ResponseData<Array<UserEntity>>> {
    const users = await this.userRepository.findAll();

    return new ResponseData('get all users', 200, users);
  }

  async findMyAll(id: ID): Promise<ResponseData<Array<UserEntity>>> {
    const users = await this.userRepository.findMyAll(id);

    return new ResponseData('get my all users', 200, users);
  }

  async findOneByLogin(login: string): Promise<ResponseData<UserEntity>> {
    const foundUser = await this.userRepository.findOneByLogin(login);

    const response = new ResponseData('success', 200, foundUser);

    if (!foundUser) {
      response.message = 'User not found';
      response.statusCode = HttpStatus.NOT_FOUND;
    }

    return response;
  }

  async findOneById(id: ID): Promise<ResponseData<UserEntity>> {
    const foundUser = await this.userRepository.findOneById(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    return new ResponseData<UserEntity>('get by id user', 200, foundUser);
  }

  async register(dto: UserEntity): Promise<ResponseData<UserEntity>> {
    dto.created_at = new Date();

    const newuser: UserEntity = new UserEntity(dto);

    const user = await this.userRepository.insert(newuser);

    return new ResponseData<UserEntity>('success', 200, user);
  }

  async updated(
    dto: UpdateUserDto,
    currentUser: UserEntity,
    id: number,
  ): Promise<ResponseData<UserEntity>> {
    dto.last_updated_at = new Date();
    dto.last_updated_by = currentUser.id;

    const hashPassword = await hashed(dto.password);

    dto.password = hashPassword;

    const newuser: UserEntity = new UserEntity(dto);

    const updateUser = await this.userRepository.update(newuser, id);

    return new ResponseData<UserEntity>('updated', 201, updateUser);
  }

  async delete(id: ID): Promise<ResponseData<UserEntity>> {
    const foundUser = await this.userRepository.findOneById(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    await this.userRepository.delete(id);

    return new ResponseData<UserEntity>('deleted', 200, foundUser);
  }
}
