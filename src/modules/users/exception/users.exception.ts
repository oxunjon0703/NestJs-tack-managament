import { HttpException } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', 404);
  }
}

export class UserLoginAlreadyExistException extends HttpException {
  constructor() {
    super('user login already exist', 400);
  }
}

export class UserNotPasswordException extends HttpException {
  constructor() {
    super('username or password is incorrect', 400);
  }
}
