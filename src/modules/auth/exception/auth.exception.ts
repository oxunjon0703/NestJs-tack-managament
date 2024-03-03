import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginOrPasswordWrongException extends HttpException {
  constructor() {
    super('User Login or Password Wrong!', HttpStatus.BAD_REQUEST);
  }
}

export class LoginUserSuchException extends HttpException {
  constructor() {
    super('Such a user exists!', HttpStatus.BAD_REQUEST);
  }
}
